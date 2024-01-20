/* eslint-disable */

import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserModule } from './module/user.module';
import { ListModule } from './module/list.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  } as MongooseModuleOptions)
  , UserModule, ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
