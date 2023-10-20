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

  async create(createContactDto: CreateContactDto) {
    const contact = await this.contactModel.create(createContactDto);
    return contact;
  }

  async requestContact(data: any) {
    const request = await this.contactModel.create(data);
    return request;
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async acceptRequest(data: any) {
    const { inviteId, receiverId } = data;
    console.log(inviteId, receiverId);
    const acceptedRequest = await this.contactModel.findOneAndUpdate(
      {
        receiver: new Types.ObjectId(receiverId),
        requestFrom: new Types.ObjectId(inviteId),
      },
      { $set: { isAccepted: true, isRejected: false } },
    );
    console.log(acceptedRequest);
    return;
  }

  async findContacts(receiver: any) {
    const contacts = await this.contactModel.find({ receiver: receiver });
    return contacts;
  }

  async listContacts(userId: any) {
    const contacts = await this.contactModel.find({
      receiver: new Types.ObjectId(userId),
      isAccepted: true,
    });
    return contacts;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
