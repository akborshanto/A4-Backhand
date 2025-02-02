import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { AuthService } from "./auth.service"
import sendResponse from "../utils/SendResponse"
import { StatusCodes } from "http-status-codes"

const register=catchAsync(async(req:Request,res:Response)=>{
    
    const result=await AuthService.register(req.body)
    sendResponse(res,{
        status:true,
        statusCode:StatusCodes.CREATED,
        message:"User  is registered successfully",
        data:result
    })
}

)
export const AuthController={
    register
}