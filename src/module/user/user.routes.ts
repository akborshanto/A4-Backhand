
import { Router } from 'express'
import { userController } from './user.controller'

// import validateRequest from '../middleware/Validate.request'
// import { UserValidation } from './user.validate'
import authToken from './../middleware/auth.tokent';

const userRouter = Router()

userRouter.post('/create-user',userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
//authorizztion user
userRouter.get('/',userController.getUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', authToken('admin '),userController.getUser)

export default userRouter