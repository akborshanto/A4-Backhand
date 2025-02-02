import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

import bcrypt from "bcryptjs";

import config from "../../app/config/config";


const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: 3,
    maxlength: 50,
  },
  age: { type: Number },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
      },
      message: "{VALUE} is not a valid email",
    },
    immutable: true,
  },
  password: {
    type: String,
    required: true,
    
  },
  photo: String,
  role: {
    type: String,
    enum: {
      values: ["customer", "admin"],
      message: "{VALUE} is not valid, please provide a valid role",
    },
    default: "customer",
    required: true,
  },
  userStatus: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
    default: "active",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // শুধুমাত্র নতুন পাসওয়ার্ড থাকলে হ্যাশ করবো

  try {
    const saltRounds = Number(config.bcrypt_salt) || 10; // সল্ট ডিফল্ট ১০ হবে
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", function (doc, next) {

  next();
});

// hook -> pre
// userSchema.pre('find', function (this, next) {
//   this.find({ userStatus: { $eq: 'active' } })
//   next()
// })

// userSchema.post('find', function (docs, next) {
//   docs.forEach((doc: IUser) => {
//     doc.name = doc.name.toUpperCase()
//   })
//   next()
// })

const User = model<IUser>("AllUser", userSchema);
export default User;
