import express, { Request, Response } from "express";
import cors from 'cors'
import userRouter from "./module/user/user.routes";
import authRouter from "./module/auth/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());
//routes
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World sfd');
  });
export default app;
