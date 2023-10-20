import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { ContactsService } from 'src/contacts/contacts.service';

@WebSocketGateway()
export class SocketGateway {
  constructor(
    private contactService: ContactsService,
    private chatService: ChatService,
  ) {}

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

  @SubscribeMessage('contactRequest')
  async contactRequestHandler(@MessageBody() data: any) {
    // console.log(data);
    return await this.contactService.requestContact(data);
  }

  @SubscribeMessage('acceptRequest')
  async acceptRequestHandler(@MessageBody() data: any) {
    const acceptedRequest = await this.contactService.acceptRequest(data);
    return;
  }
}
