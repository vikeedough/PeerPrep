import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class MatchingService {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  // In-memory queues for different difficulty levels, each user has a userID, topics and a socketId
  private queues: { [difficulty: string]: Array<{ userId: string, topics: string[], socketId: string }> } = {
    easy: [],
    medium: [],
    hard: [],
  };

  // Enqueue a user into the appropriate difficulty queue and attempt to match
  private enqueue(userId: string, difficulty: string, topics: string[], socketId: string): void {
    const user = { userId, topics, socketId };  
    this.queues[difficulty].push(user);
    this.matchUsers(difficulty);
  }

  // Check if two users have common topics
  private haveCommonTopics(topics1: string[], topics2: string[]): boolean {
    return topics1.some(topic => topics2.includes(topic));
  }

  // Match users in the queue based on topics
  private matchUsers(difficulty: string): void {
    const queue = this.queues[difficulty];
    if (queue.length < 2) return;

    // Match users based on their topics
    const matchedPairs: Array<{ user1: string, user2: string }> = [];
    
    for (let i = 0; i < queue.length; i++) {
      for (let j = i + 1; j < queue.length; j++) {
        const user1 = queue[i];
        const user2 = queue[j];
        if (this.haveCommonTopics(user1.topics, user2.topics)) {
          matchedPairs.push({ user1: user1.userId, user2: user2.userId });
          // Remove matched users from the queue
          queue.splice(j, 1);
          queue.splice(i, 1);
          i--;
          break;
        }
      }
    }

    // Handle matched pairs (e.g., notify users, create rooms, etc.)
    this.handleMatchedPairs(matchedPairs);
  }

  // Placeholder for handling matched pairs
  private handleMatchedPairs(pairs: Array<{ user1: string, user2: string }>): void {
    pairs.forEach(pair => {
      console.log(`Matched users: ${pair.user1} and ${pair.user2}`);
    });
    // Implement actual notification logic here
    // e.g., this.server.to(user1.socketId).emit('matched', { with: user2.userId });
  }
}