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

  async getContactMessages(requestId: any, userId: any) {
    const chats = await this.chatModel
      .find({
        $or: [
          {
            $and: [
              {
                sender: new Types.ObjectId(userId),
                receiver: new Types.ObjectId(requestId),
              },
            ],
          },
          {
            $and: [
              {
                sender: new Types.ObjectId(requestId),
                receiver: new Types.ObjectId(userId),
              },
            ],
          },
        ],
      })
      .sort({ createdAt: 1 });
    return chats;
  }
}
