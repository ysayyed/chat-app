import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IChat } from './Schema/chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<IChat>,
  ) {}

  async saveMessage(
    sender: string,
    message: string,
    receiver: string,
  ): Promise<any> {
    const newMessage = new this.chatModel({ sender, message, receiver });
    return await newMessage.save();
  }

  async getMessages(): Promise<any[]> {
    return await this.chatModel.find().exec();
  }
}
