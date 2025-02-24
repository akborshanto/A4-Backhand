import express, { Request, Response } from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";

import userRouter from "./module/user/user.routes";
import BicycleRouter from "./module/bycle/bicycle.routes";
import orderRouter from "./module/order/order.routes";
import loginRouter from "./module/login/login.routes";
// import authRouter from "./module/auth/auth.routes";

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:'http://localhost:5173',credentials:true}));
//routes
// app.use('/api/auth',authRouter)
app.use('/api/bicycle',BicycleRouter)
app.use('/api/user',userRouter)
app.use('/api/login',loginRouter)
app.use('/api/order',orderRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World sfd');
  });
export default app;
