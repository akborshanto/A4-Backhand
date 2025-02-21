
import { Router } from 'express'
import { userController } from './user.controller'
// import validateRequest from '../middleware/Validate.request'
// import { UserValidation } from './user.validate'

const userRouter = Router()

userRouter.post('/create-user',userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', userController.getUser)

export default userRouter