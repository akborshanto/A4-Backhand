import { StatusCodes } from "http-status-codes"
import catchAsync from "../utils/catchAsync"
import sendResponse from "../utils/SendResponse"
import { loginServices } from "./login.service"

const loginUser = catchAsync(async (req, res) => {
    const payload = req.body
  
    const result = await loginServices.loginUser(payload)
  
    // res.json({
    //   status: true,
    //   message: 'User created successfully',
    //   data: result,
    // })
  
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'User logged in  successfully',
      token: result.token,
      data: result.verifiedUser,
    })
  })
  
  //get login user
const getLoginUser = catchAsync(async (req, res) => {
  const result = await loginServices.getLogin()
// console.log(result)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'login getting successfully',
    data: result,
  })
})
  export const loginController={
loginUser,
getLoginUser
}