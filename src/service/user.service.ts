/* eslint-disable */

import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interface/user.interface';
import { Login } from '../interface/login.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../schema/user.model';

interface TokenPayload {
  userId: string;
}

interface LoginResponse {
  status: HttpStatus;
  message: string;
  token?: string;
}

interface RegisterResponse {
  status: HttpStatus;
  message: string;
}

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserModel>) {}

  async register(user: User): Promise<RegisterResponse> {
    try {
      const existingUser = await this.userModel.findOne({ username: user.username }).exec();
      if (existingUser) {
        // User with the same username already exists
        return { status: HttpStatus.CONFLICT, message: 'Username already exists' };
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create a new user with the hashed password
      const newUser = new this.userModel({
        email: user.email,
        username: user.username,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      // Return success message
      return { status: HttpStatus.CREATED, message: 'Register Successfully!' };
    } catch (error) {
      // Handle other errors
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' };
    }
  }

  async login(user: Login): Promise<LoginResponse> {
    try {
      // Find the user by email
      const existingUser = await this.userModel.findOne({ email: user.email }).exec();

      if (!existingUser) {
        // User with the given email does not exist
        return { status: HttpStatus.UNAUTHORIZED, message: 'Invalid credentials' };
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(user.password, existingUser.password);

      if (!passwordMatch) {
        // Passwords do not match
        return { status: HttpStatus.UNAUTHORIZED, message: 'Invalid credentials' };
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: existingUser._id }, 'yourSecretKey', { expiresIn: '1h' });

      // Return the authenticated user data along with the token
      return { status: HttpStatus.OK, message: 'Login Successfully', token };
    } catch (error) {
      // Handle other errors
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' };
    }
  }
}
