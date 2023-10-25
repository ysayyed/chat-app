import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { SocketModule } from './socket/socket.module';
import { ContactsModule } from './contacts/contacts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/chat-app'),
    UserModule,
    ChatModule,
    SocketModule,
    ContactsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
