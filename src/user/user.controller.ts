import {
  Controller,
  Post,
  Body,
  Redirect,
  HttpException,
  HttpStatus,
  Render,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { ContactsService } from 'src/contacts/contacts.service';
import { Types, ObjectId } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private contactService: ContactsService,
  ) {}

  @Post('/signup')
  @Redirect('/login')
  async create(@Body() payload: any) {
    await this.userService.createUser(payload);
    // console.log(payload);
    return;
  }

  @Post('/login')
  @Redirect('dashboard')
  async login(@Body() payload: any, @Res() res: Response) {
    const user = await this.userService.login(payload);
    if (user) {
      res.cookie('userId', user.id);
      return { user };
    } else {
      console.log('No user found');
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('/dashboard')
  @Render('dashboard')
  async findAll(@Req() req: Request) {
    let userId = req.cookies.userId;
    const users = await this.userService.findAll(userId);
    const user = await this.userService.findOne(userId);
    const contacts = await this.contactService.findContacts(userId);
    const friends = []
    const friendsName = []
    const nonContacts = []

    contacts.forEach(contact =>{
    if(contact.requestFrom == user.id || contact.receiver == user.id){
      friends.push({
        sender: contact.sender,
        receiver: contact.recepient
      })}
    })

    friends.forEach(friend =>{
      if(!(friend.sender == user.name)){
        friendsName.push(friend.sender)
      }
      else if(!(friend.receiver == user.name)){
        friendsName.push(friend.receiver)
      }
    })

    users.forEach(usr=>{
      if(!friendsName.includes(usr.name)){
        nonContacts.push({
          id: usr.id,
          name: usr.name
        })
      }
    })    

    // console.log("Friends Name",friendsName)
    // console.log("Friends",friends)
    // console.log("nonContacts", nonContacts)

    return { users, user, contacts, nonContacts };
  }

  @Post('/logout')
  @Redirect('/')
  async logout(@Res() res: Response) {
    res.clearCookie('userId');
    return;
  }
}
