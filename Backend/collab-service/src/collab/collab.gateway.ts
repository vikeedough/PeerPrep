import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ namespace: '/collab', transports: ['websocket'] })
export class CollabGateway {
  constructor(private readonly auth: AuthService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      // read token from handshake auth
      const token = (client.handshake.auth?.token as string) || null;
      // verify JWT
      const { userId } = this.auth.verify(token);

      const sessionId = client.handshake.auth.sessionId as string | null;
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
