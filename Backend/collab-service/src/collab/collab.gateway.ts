import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/collab', transports: ['websocket'] })
export class CollabGateway {
  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log('Ping received:', data);
    client.emit('pong', { msg: 'Hello from server!' });
  }
}
