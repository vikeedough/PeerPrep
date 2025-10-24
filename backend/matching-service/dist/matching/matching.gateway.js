"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let MatchingGateway = class MatchingGateway {
    server;
    queues = {
        easy: [],
        medium: [],
        hard: [],
    };
    async handleJoinQueue(client, payload) {
        const { v4: uuidv4 } = await import('uuid');
        this.enqueue(payload.userId, payload.difficulty, payload.topics, client.id, uuidv4);
    }
    enqueue(userId, difficulty, topics, socketId, uuidv4) {
        const user = { userId, topics, socketId };
        this.queues[difficulty].push(user);
        this.matchUsers(difficulty, uuidv4);
    }
    haveCommonTopics(topics1, topics2) {
        return topics1.some((t) => topics2.includes(t));
    }
    matchUsers(difficulty, uuidv4) {
        const queue = this.queues[difficulty];
        if (queue.length < 2)
            return;
        const matchedPairs = [];
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
    handleMatchedPairs(pairs, uuidv4) {
        pairs.forEach((pair) => {
            const { user1, user2 } = pair;
            const roomId = uuidv4();
            this.server.to(user1.socketId).emit('matched', { roomId, matchedUserId: user2.userId });
            this.server.to(user2.socketId).emit('matched', { roomId, matchedUserId: user1.userId });
            console.log(`Matched users: ${user1.userId} ↔ ${user2.userId} in room ${roomId}`);
        });
    }
};
exports.MatchingGateway = MatchingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MatchingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-queue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MatchingGateway.prototype, "handleJoinQueue", null);
exports.MatchingGateway = MatchingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/matching' })
], MatchingGateway);
//# sourceMappingURL=matching.gateway.js.map