/* eslint-disable */

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interface/user.interface';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../schema/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserModel>) {}

  async register(user: User): Promise<User> {
    const existingUser = await this.userModel.findOne({ username: user.username }).exec();
    if (existingUser) {
      // User with the same username already exists
      throw new Error('Username already exists');
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
    const savedUser = await newUser.save();

    // Return the saved user data (you may want to exclude the password field here)
    return savedUser.toObject({ versionKey: false });
  }

  async login(user: User): Promise<User> {
    // Find the user by username
    const existingUser = await this.userModel.findOne({ email: user.email }).exec();

    if (!existingUser) {
      // User with the given username does not exist
      throw new Error('Invalid credentials');
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(user.password, existingUser.password);

    if (!passwordMatch) {
      // Passwords do not match
      throw new Error('Invalid credentials');
    }

    // Return the authenticated user data (you may want to exclude the password field here)
    return existingUser.toObject({ versionKey: false });
  }
}
