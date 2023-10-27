import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IContact } from './Schema/contact.schema';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contact')
    private contactModel: Model<IContact>,
  ) {}

  async requestContact(data: CreateContactDto): Promise<IContact> {
    const request = await this.contactModel.create(data);
    return request;
  }

  async acceptRequest(data: any) {
    const { inviteId, receiverId } = data;
    try {
      await this.contactModel.findOneAndUpdate(
        {
          receiver: new Types.ObjectId(receiverId),
          requestFrom: new Types.ObjectId(inviteId),
        },
        { $set: { isAccepted: true, isRejected: false } },
      );
      return { status: true, message: 'Updated' };
    } catch (error) {
      return { status: false, message: "Can't update", error };
    }
  }

  async rejectRequest(data: any) {
    const { inviteId, receiverId } = data;
    await this.contactModel.findOneAndDelete({
      receiver: new Types.ObjectId(receiverId),
      requestFrom: new Types.ObjectId(inviteId),
    });
    return;
  }

  async findContacts(userId: any) {
    const contacts = await this.contactModel.find({ _id: { $ne: userId } });
    // console.log(contacts)
    return contacts;
  }

  async listContacts(userId: any) {
    const contacts = await this.contactModel.find({
      $and: [
        {
          $or: [
            { requestFrom: new Types.ObjectId(userId) },
            { receiver: new Types.ObjectId(userId) },
          ],
        },
        { isAccepted: true },
      ],
    });
    // console.log(contacts);
    return contacts;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
