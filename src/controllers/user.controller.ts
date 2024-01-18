/* eslint-disable */

// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User) {
    return this.userService.register(user);
  }

  @Post('login')
  async login(@Body() user: User) {
    return this.userService.login(user);
  }
}
