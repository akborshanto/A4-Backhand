import mongoose, { Schema, Document } from 'mongoose';
import { TLoginUser } from './login.inter';

// Defining the Login User Model interface
export interface ILoginUser extends Document {
  id: string;
  password: string;
}

// Creating the Login User Schema
const LoginUserSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating the Login User Model
const LoginUserModel = mongoose.model<TLoginUser>('LoginUser', LoginUserSchema);

export default LoginUserModel;
