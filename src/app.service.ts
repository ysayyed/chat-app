import { Get, Injectable, Render, Res } from '@nestjs/common';
import { Response } from 'express';
@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello world' };
  }
}
