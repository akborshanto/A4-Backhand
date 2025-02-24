// req and res manage

import { userService } from './user.service'

import { StatusCodes } from 'http-status-codes'

import catchAsync from './../utils/catchAsync';
import sendResponse from './../utils/SendResponse';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await userService.createUser(payload)

  // res.json({
  //   status: true,
  //   message: 'User created successfully',
  //   data: result,
  // })

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  })
})

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser()
// console.log(result)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users getting successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {

  const userId = req.params.userId

  const result = await userService.getSingleUser(userId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User getting successfully',
    data: result,
  })
})
//get email user
const getSingleEmail = catchAsync(async (req, res) => {
  const email = req.params.email;
  

  // Ensure that you are searching by email and not by _id
  const result = await userService.getSingleEmail( email );

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'User not found',
      data:result
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  // Call the update function
  const result = await userService.updateUser(userId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated successfully',
    data: result,
  });
});


const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  await userService.deleteUser(userId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'user deleted successfully',
    data: {},
  })
})






export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getSingleEmail
}