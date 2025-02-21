import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

import catchAsync from '../utils/catchAsync';
import User from '../user/user.model';

dotenv.config();

const authToken = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Checking if the token is missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error('You are not authorized!');
    }

    // Extracting the token
    const token = authHeader.split(" ")[1];

    // Verifying the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const { email } = decoded;

    // Checking if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('This user is not found!');
    }

    // Checking if the user is inactive
    if (user.userStatus === 'inactive') {
      throw new Error('This user is blocked!');
    }

    // Checking if the user has the required role
    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new Error('You are not authorized!');
    }

    req.user = { id: user._id, email: user.email, role: user.role } as JwtPayload;
    next();
  });
};

export default authToken;
