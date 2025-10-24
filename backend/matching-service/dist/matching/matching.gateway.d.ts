import { Server } from 'socket.io';
export declare class MatchingGateway {
    server: Server;
    private queues;
    handleJoinQueue(client: any, payload: {
        userId: string;
        difficulty: string;
        topics: string[];
    }): Promise<void>;
    private enqueue;
    private haveCommonTopics;
    private matchUsers;
    private handleMatchedPairs;
}
