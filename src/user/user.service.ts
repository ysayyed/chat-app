import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './Schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async createUser(data: any) {
    const user = await this.userModel.create(data);
    return user;
  }
}
