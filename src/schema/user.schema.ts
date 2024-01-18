/* eslint-disable */
import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export const UserModal = mongoose.model('User', UserSchema);