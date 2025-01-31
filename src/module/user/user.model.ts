import { Schema, model,  } from "mongoose";
import { TUser } from './user.interface';
import bcrypt from "bcryptjs";
const userSchema = new Schema<TUser>(
    {
     
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['admin', 'customer', 'user'], default: 'customer' },
      status: { type: String, enum: ['in-progress', 'blocked'], default: 'in-progress' },
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  // 🔹 Password Hashing (Pre-save Hook)
// ✅ Password Hashing (Pre-save Hook)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 
  const salt = await bcrypt.genSalt(10); 
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password); 
};
  const UserModel = model<TUser>('User', userSchema);
  
  export default UserModel