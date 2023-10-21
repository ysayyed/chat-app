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
    const userId = req.cookies.userId;
    const users = await this.userService.findAll();
    const user = await this.userService.findOne(userId);
    const contacts = await this.contactService.findContacts(userId);
    return { users, user, contacts };
  }

  @Post('/logout')
  @Redirect('/')
  async logout(@Res() res: Response) {
    res.clearCookie('userId');
    return;
  }
}
