/* eslint-disable */

// user.controller.ts
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

interface LoginResponse {
  status: HttpStatus;
  message: string;
  token?: string;
}

interface RegisterResponse {
  status: HttpStatus;
  message: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: RegisterDto): Promise<RegisterResponse> {
    return this.userService.register(user);
  }

  @Post('login')
  async login(@Body() user: LoginDto): Promise<LoginResponse> {
    return this.userService.login(user);
  }
}
