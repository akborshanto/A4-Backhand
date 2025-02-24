import User from "../user/user.model";
import { TLoginUser } from "./login.inter";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import LoginUserModel from "./login.model";

dotenv.config();

const loginUser = async (payload: TLoginUser) => {
 
  const user = await User.findOne({ email: payload?.email.toLowerCase() }).select("+password");
console.log(user,"EMAIL")

    if (!user) {
        throw new Error("User not found!");
    }

    if (user.userStatus === "inactive") {
        throw new Error("User is inactive!");
    }

    // Checking if the password is correct
    const isPasswordMatched = await bcrypt.compare(payload?.password, user?.password);

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password.");
    }

    // Create token and send to the client
    const jwtPayload = {
        _id:user?.id,
        email: user.email,
        role: user?.role,
        photo:user?.photo,
        
    };

    const token = Jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET_KEY as string, { expiresIn: "1d" });

    const verifiedUser = {
        name: user.name,
        email: user.email,
        role: user.role
    };

    return { token, verifiedUser };
};


const getLogin= async () => {
  const result = await LoginUserModel.find()
  return result
}

export const loginServices = {
    loginUser,
    getLogin
};
