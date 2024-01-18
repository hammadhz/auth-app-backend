import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
