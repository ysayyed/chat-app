import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async findAll(userId:any) {
    const users = await this.userModel.find({_id: {$ne: userId}})
    return users;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async friendOrNot(userId:any){
    const joinedData = await this.userModel.aggregate([
      {
      $match: {
      _id: {$ne: new Types.ObjectId(userId)}
      }
      },
      {
      $lookup:{
        from: 'contacts',
        localField: '_id',
        foreignField: 'requestFrom',
        as: "Invited"
      }
      },
      {
      $lookup:{
        from: 'contacts',
        localField: '_id',
        foreignField: 'receiver',
        as: "Received"
      }
      },
      {$project: {name: 1, Invited:1, Received: 1}}
      ])
      joinedData.forEach(data=>{
        console.log(data.Invited)
      })
      
  }


}
