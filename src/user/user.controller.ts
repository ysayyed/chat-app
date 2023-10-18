import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() payload: any) {
    console.log(payload);
    return this.userService.createUser(payload);
  }
}
