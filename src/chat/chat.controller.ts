import { Controller, Get, Param, Render } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
import { ContactsService } from 'src/contacts/contacts.service';

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

  @Get()
  @Render('chat')
  async getUserChatroom(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    const contacts = await this.contactService.listContacts(user._id);
    return { user: user, contacts };
  }
}
