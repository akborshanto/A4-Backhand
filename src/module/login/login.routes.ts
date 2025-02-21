
import { Router } from 'express'
import { loginController } from './login.controller'

const loginRouter = Router()

loginRouter.post('/create-login',loginController.loginUser )
loginRouter.get('/',loginController.getLoginUser )


export default loginRouter