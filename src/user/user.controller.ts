import {
  Controller,
  Post,
  Body,
  Redirect,
  HttpException,
  HttpStatus,
  Render,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @Redirect('/login')
  async create(@Body() payload: any) {
    return this.userService.createUser(payload);
  }

  @Post('/login')
  @Render('chat')
  async login(@Body() payload: any) {
    const user = await this.userService.login(payload);
    if (user) {
      return { user };
    } else {
      console.log('No user found');
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
  }
}
