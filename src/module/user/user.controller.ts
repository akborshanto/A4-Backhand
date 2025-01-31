import { Request, Response } from "express"
import UserModel from "./user.model";

const createUser=async (req:Request,res:Response)=>{
const payload=req.body;
/* console.log(payload) */
const result=await UserModel.create(payload)
console.log(result)
res.json({
    message:"user created successfully",
    data:result
})

}

export const userController={
    createUser
}