import * as Y from 'yjs';
import { Awareness } from 'y-protocols/awareness';
import { Injectable, Logger } from '@nestjs/common';
import { ClassicLevel } from 'classic-level';

export type SessionState = {
  doc: Y.Doc;
  awareness: Awareness;
  numberOfOperations: number;
  lastSnapshotAt: number;
  isLoadedFromDB: boolean;
};

const SNAPSHOT_PREFIX = 'snapshot:';
const UDPATE_PREFIX = 'update:';

const SNAPSHOT_INTERVAL_MS = 30000; // 30 seconds
const OPERATIONS_THRESHOLD = 200;
const PRUNE_THRESHOLD_MS = 60000; // 1 minute

function updateKey(sessionId: string, timestamp: number) {
  const random = Math.random().toString(36).slice(2, 8);
  const paddedTimestamp = String(timestamp).padStart(13, '0');
  return `${UDPATE_PREFIX}${sessionId}:${paddedTimestamp}:${random}`;
}

function updateRange(sessionId: string) {
  const base = `${UDPATE_PREFIX}${sessionId}:`;
  return { gte: base, lt: base + '\xFF' };
}

@Injectable()
export class CollabService {
  private readonly log = new Logger('CollabService');

  private sessions = new Map<string, SessionState>();
  private db: ClassicLevel<string, Uint8Array>;

  constructor() {
    const path = process.env.COLLAB_SERVICE_PATH;
    // store uint8array values
    this.db = new ClassicLevel<string, Uint8Array>(path, {
      keyEncoding: 'utf-8',
      valueEncoding: 'view', // returns uint8array
    });
  }

  private newSession(): SessionState {
    const doc = new Y.Doc();
    // Provide a default initial content
    doc.getText('content').insert(0, 'Welcome to the collaborative editor!\n');
    const awareness = new Awareness(doc);
    return {
      doc,
      awareness,
      numberOfOperations: 0,
      lastSnapshotAt: Date.now(),
      isLoadedFromDB: false,
    };
  }

  async getOrLoadSession(sessionId: string): Promise<SessionState> {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = this.newSession();
      this.sessions.set(sessionId, session);
    }
    if (!session.isLoadedFromDB) {
      await this.loadSessionFromDB(sessionId, session);
      session.isLoadedFromDB = true;
    }
    return session;
  }

  async loadSessionFromDB(sessionId: string, session: SessionState) {
    // load latest snapshot
    try {
      const snapshotKey = SNAPSHOT_PREFIX + sessionId;
      const snapshot = await this.db.get(snapshotKey);
      if (snapshot && snapshot.byteLength > 0) {
        Y.applyUpdate(session.doc, snapshot);
        this.log.log(`Loaded snapshot for session ${sessionId}`);
      }
    } catch (error) {
      this.log.error(
        `Failed to load snapshot for session ${sessionId}: ${error}`,
      );
    }
    // check latest updates
    for await (const [key, val] of this.db.iterator(updateRange(sessionId))) {
      try {
        Y.applyUpdate(session.doc, val);
      } catch (error) {
        this.log.error(
          `Failed to apply update ${key} for session ${sessionId}: ${error}`,
        );
      }
    }
  }

  // getOrCreateSession(sessionId: string): SessionState {
  //   let session = this.sessions.get(sessionId);
  //   if (session) {
  //     return session;
  //   }

  //   const doc = new Y.Doc();
  //   // Provide a default initial content
  //   doc.getText('content').insert(0, 'Welcome to the collaborative editor!\n');

  //   const awareness = new Awareness(doc);
  //   session = { doc, awareness };
  //   this.sessions.set(sessionId, session);
  //   return session;
  // }

  encodeCurrentState(sessionId: string): Promise<Uint8Array> {
    // return Y.encodeStateAsUpdate(this.getOrCreateSession(sessionId).doc);
    return this.getOrLoadSession(sessionId).then((session) =>
      Y.encodeStateAsUpdate(session.doc),
    );
  }

  applyUpdateToSession(sessionId: string, update: Uint8Array) {
    Y.applyUpdate(this.getOrCreateSession(sessionId).doc, update);
  }

  getAwareness(sessionId: string): Awareness {
    return this.getOrCreateSession(sessionId).awareness;
  }
}
