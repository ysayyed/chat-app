import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { chatSchema } from './Schema/chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: chatSchema }])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
