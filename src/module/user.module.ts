/* eslint-disable */
import { Module } from "@nestjs/common";
import { UserController } from '../controllers/user.controller';
import { UserService } from '../service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "src/schema/user.model";

@Module({
    imports: [MongooseModule.forFeature(
      [{
      name: 'User',
      schema: UserSchema,
}])],
    controllers: [UserController],
    providers: [UserService],
  })
  export class UserModule {}