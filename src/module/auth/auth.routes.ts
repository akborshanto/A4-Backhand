import { Router } from "express";
import { AuthController } from "./authController";


const authRouter=Router()
authRouter.post('/register',AuthController.register)
export default authRouter;