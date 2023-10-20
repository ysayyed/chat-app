import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('/signup')
  @Render('signup')
  getSignup() {
    return;
  }

  @Get('/login')
  @Render('login')
  getLogin() {
    return;
  }
}
