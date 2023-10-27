import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IChat } from './Schema/chat.schema';
import { Model, Types } from 'mongoose';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<IChat>,
  ) {}

  async saveMessage(
    sender: string,
    text: string,
    receiver: string,
  ): Promise<IChat> {
    try {
      return await this.chatModel.create({ sender, text, receiver });
    } catch (error) {
      throw new BadRequestException({
        status: false,
        code: HttpStatus.BAD_REQUEST,
        error: error.response?.message,
      });
    }
  }

  async getContactMessages(requestId: any, userId: any): Promise<IChat[]> {
    try {
      return await this.chatModel
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
    } catch (error) {
      throw new BadRequestException({
        status: false,
        code: HttpStatus.BAD_REQUEST,
        error: error._message,
      });
    }
  }
}
