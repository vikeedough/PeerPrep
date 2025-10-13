import * as Y from 'yjs';
import { Awareness } from 'y-protocols/awareness';
import { Session } from 'inspector/promises';

export type SessionState = {
  doc: Y.Doc;
  awareness: Awareness;
};

export class CollabService {
  private sessions = new Map<string, SessionState>();

  getOrCreateSession(sessionId: string): SessionState {
    let session = this.sessions.get(sessionId);
    if (session) {
      return session;
    }

    const doc = new Y.Doc();
    // Provide a default initial content
    doc.getText('content').insert(0, 'Welcome to the collaborative editor!\n');

    const awareness = new Awareness(doc);
    session = { doc, awareness };
    this.sessions.set(sessionId, session);
    return session;
  }

  encodeCurrentState(sessionId: string): Uint8Array {
    return Y.encodeStateAsUpdate(this.getOrCreateSession(sessionId).doc);
  }

  applyUpdateToSession(sessionId: string, update: Uint8Array) {
    Y.applyUpdate(this.getOrCreateSession(sessionId).doc, update);
  }

  getAwareness(sessionId: string): Awareness {
    return this.getOrCreateSession(sessionId).awareness;
  }
}
