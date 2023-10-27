import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { NextFunction } from 'express';

@Controller('chat/:userId')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private contactService: ContactsService,
  ) {}

  @Get('/chatRoom/:requestId')
  @Render('chatRoom')
  async getChatRoom(
    @Param('requestId') requestId: any, //Id of receiver
    @Param('userId') userId: any, // Id of logged in user
  ) {
    const chats = await this.chatService.getContactMessages(requestId, userId);
    const user = await this.userService.findOne(userId);
    const receiver = await this.userService.findOne(requestId);
    return { user: user, receiver: receiver, chats };
  }

  @Post('/fileUpload/:requestId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          return cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async saveFile(
    @Param('requestId') requestId: any,
    @Param('userId') userId: any,
    @UploadedFile() file: any,
  ) {
    return file;
  }

  @Post()
  async create(@Body() data: any) {
    const { sender, text, receiver } = data;
    return this.chatService.saveMessage(sender, text, receiver);
  }

  @Get()
  @Render('chat')
  async getUserChatroom(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    const contacts = await this.contactService.listContacts(user._id);
    return { user: user, contacts };
  }
}
