import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './Schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
  ) {}

  async createUser(data: any) {
    await this.userModel.create(data);
    return;
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await this.userModel.findOne({ email: email });

    if (user && user.password === password) {
      return user;
    } else {
      return false;
    }
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }
}
