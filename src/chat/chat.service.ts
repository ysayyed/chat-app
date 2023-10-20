import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IChat } from './Schema/chat.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<IChat>,
  ) {}

  async saveMessage(sender: string, message: string, receiver: string) {
    const newMessage = new this.chatModel({ sender, message, receiver });
    return await newMessage.save();
  }

  async getMessages(): Promise<any[]> {
    return await this.chatModel.find().exec();
  }

  async getContactMessages(requestId: any, userId: any) {
    const receivedMessages = await this.chatModel.find({
      receiver: new Types.ObjectId(userId),
      sender: new Types.ObjectId(requestId),
    });
    const sentMessages = await this.chatModel.find({
      receiver: new Types.ObjectId(requestId),
      sender: new Types.ObjectId(userId),
    });
    return { receivedMessages, sentMessages };
  }
}
