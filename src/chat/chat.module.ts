import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { chatSchema } from './Schema/chat.schema';
import { UserModule } from 'src/user/user.module';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: chatSchema }]),
    UserModule,
    ContactsModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
