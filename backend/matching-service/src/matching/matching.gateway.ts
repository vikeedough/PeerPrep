import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/matching' })
export class MatchingGateway {
  @WebSocketServer()
  server: Server;

  private queues: Record<string, Array<{ userId: string; topics: string[]; socketId: string }>> = {
    easy: [],
    medium: [],
    hard: [],
  };

  @SubscribeMessage('join-queue')
  async handleJoinQueue(client: any, payload: { userId: string; difficulty: string; topics: string[] }) {
    const { v4: uuidv4 } = await import('uuid'); 
    this.enqueue(payload.userId, payload.difficulty, payload.topics, client.id, uuidv4);
  }

  private enqueue(
    userId: string,
    difficulty: string,
    topics: string[],
    socketId: string,
    uuidv4: () => string
  ): void {
    const user = { userId, topics, socketId };
    this.queues[difficulty].push(user);
    this.matchUsers(difficulty, uuidv4);
  }

  private haveCommonTopics(topics1: string[], topics2: string[]): boolean {
    return topics1.some((t) => topics2.includes(t));
  }

  private matchUsers(difficulty: string, uuidv4: () => string): void {
    const queue = this.queues[difficulty];
    if (queue.length < 2) return;

    const matchedPairs: Array<{ user1: any; user2: any }> = [];

    for (let i = 0; i < queue.length; i++) {
      for (let j = i + 1; j < queue.length; j++) {
        const u1 = queue[i];
        const u2 = queue[j];
        if (this.haveCommonTopics(u1.topics, u2.topics)) {
          matchedPairs.push({ user1: u1, user2: u2 });
          queue.splice(j, 1);
          queue.splice(i, 1);
          i--;
          break;
        }
      }
    }

    this.handleMatchedPairs(matchedPairs, uuidv4);
  }

  private handleMatchedPairs(pairs: Array<{ user1: any; user2: any }>, uuidv4: () => string): void {
    pairs.forEach((pair) => {
      const { user1, user2 } = pair;
      const roomId = uuidv4();

      this.server.to(user1.socketId).emit('matched', { roomId, matchedUserId: user2.userId });
      this.server.to(user2.socketId).emit('matched', { roomId, matchedUserId: user1.userId });

      console.log(`Matched users: ${user1.userId} ↔ ${user2.userId} in room ${roomId}`);
    });
  }
}
