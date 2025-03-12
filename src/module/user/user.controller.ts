import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import catchAsync from './../utils/catchAsync';
import sendResponse from './../utils/SendResponse';

// ✅ Create a new user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createUser(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

// ✅ Get all users
const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users fetched successfully',
    data: result,
  });
});

// ✅ Get a single user by ID
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await userService.getSingleUser(userId);

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'User not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

// ✅ Get a user by Email
const getSingleEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  console.log(email, "EMAIL PARAM");

  const result = await userService.getSingleEmail(email);
  console.log(result, "USER RESULT");

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'User not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

// ✅ Update a user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const body = req.body;

  const result = await userService.updateUser(userId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated successfully',
    data: result,
  });
});

// ✅ Delete a user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: {},
  });
});

// ✅ Export User Controller
export const userController = {
  createUser,
  getUser,
  getSingleUser,
  getSingleEmail,
  updateUser,
  deleteUser,
};
