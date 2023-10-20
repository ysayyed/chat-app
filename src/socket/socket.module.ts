import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  imports: [ChatModule, ContactsModule],
  providers: [SocketGateway],
})
export class SocketModule {}
