import { NextFunction, Request, Response, Router } from 'express'
import { userController } from './user.controller'
import { UserValidation } from './user.validate'

const userRouter = Router()

userRouter.post('/create-user',async(req:Request,res:Response,next:NextFunction)=>{


try {
   
   await UserValidation.userValidationSchema.parseAsync(req.body) 
} catch (error) {
    
 next(error)   
}

}, userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', userController.getUser)

export default userRouter