import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ namespace: '/collab', transports: ['websocket'] })
export class CollabGateway {
  constructor(private readonly auth: AuthService) {}

  async handleConnection(client: Socket) {
    try {
      // read token from handshake auth
      const token = (client.handshake.auth?.token as string) || null;
      // verify JWT
      const { userId } = this.auth.verify(token);
      // attach userId to socket
      (client as any).userId = userId;

      // small emit to confirm connection
      client.emit('collab:connected', { ok: true, userId });
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

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log('Ping received:', data);
    client.emit('pong', { msg: 'Hello from server!' });
  }
}
