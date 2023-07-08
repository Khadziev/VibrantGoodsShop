import mongoose, { Document, Model, Schema } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserAttributes {
  name: string;
  login: string;
  password: string;
  role: UserRole;
}

interface UserDocument extends Document, UserAttributes {}

const userSchema: Schema<UserDocument> = new Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [UserRole.ADMIN, UserRole.USER],
    required: true,
  },
});

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
