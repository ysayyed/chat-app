import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway()
export class SocketGateway {
  constructor() {} // private readonly chatService: ChatService

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data, client.id);
    return data;
  }
}
