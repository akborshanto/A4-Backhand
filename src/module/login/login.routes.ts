
import { Router } from 'express'
import { loginController } from './login.controller'

const loginRouter = Router()

loginRouter.post('/',loginController.loginUser )
loginRouter.get('/',loginController.getLoginUser )


export default loginRouter