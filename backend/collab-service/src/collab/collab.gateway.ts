import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { CollabService } from './collab.service';
import { toUint8 } from './helpers';

@WebSocketGateway({ namespace: '/collab', transports: ['websocket'] })
export class CollabGateway {
  constructor(
    private readonly auth: AuthService,
    private readonly collab: CollabService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      // read token from handshake auth
      const token = (client.handshake.auth?.token as string) || null;
      // verify JWT
      const { userId } = this.auth.verify(token);

      const sessionId = (
        client.handshake.auth.sessionId as string | null
      ).trim();
      if (!sessionId) {
        client.emit('collab:error', {
          ok: false,
          message: 'No sessionId provided',
        });
        client.disconnect();
        return;
      }

      // attach userId and sessionId to socket
      client.data.userId = userId;
      client.data.sessionId = sessionId;

      // join room based on sessionId
      client.join('session:' + sessionId);

      // send current doc state to the client
      const state = this.collab.encodeCurrentState(sessionId);
      client.emit('collab:state', state);

      // small emit to confirm connection
      client.emit('collab:connected', { ok: true, userId, sessionId });
      console.log(`User ${userId} connected to session ${sessionId}`);
      console.log('Current rooms:', client.rooms);
    } catch (error) {
      try {
        client.emit('collab:error', {
          ok: false,
          message: (error as Error).message,
        });
      } catch (error) {
        console.error('Error during WebSocket connection:', error);
      }
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const { userId, sessionId } = client.data;
    console.log(`User ${userId} disconnected from session ${sessionId}`);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log('Ping received:', data);
    client.emit('pong', { msg: 'Hello from server!' });
  }

  @SubscribeMessage('collab:update')
  handleStateUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() updateData: unknown,
  ) {
    const sessionId = client.data.sessionId as string;
    if (!sessionId) {
      return;
    }

    const update = toUint8(updateData);

    // apply to server doc
    this.collab.applyUpdateToSession(sessionId, update);

    // broadcast to other clients in the same session
    client.to('session:' + sessionId).emit('collab:update', update);
  }

  @SubscribeMessage('collab:awareness')
  handleAwarenessUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() awarenessData: unknown,
  ) {
    const sessionId = client.data.sessionId as string;
    if (!sessionId) {
      return;
    }

    const update = toUint8(awarenessData);

    client.to('session:' + sessionId).emit('collab:awareness', update);
  }

  @SubscribeMessage('collab:listAllRooms')
  async listAllRooms(@ConnectedSocket() client: Socket) {
    const sockets = await this.server.fetchSockets();

    const roomDetails: Record<string, string[]> = {};
    for (const socket of sockets) {
      for (const room of socket.rooms) {
        if (room === socket.id) continue; // skip individual socket room
        if (!roomDetails[room]) {
          roomDetails[room] = [];
        }
        roomDetails[room].push(socket.id);
      }
    }

    client.emit('collab:roomDetails', roomDetails);
    console.log('Room details sent to client:', roomDetails);
  }
}
