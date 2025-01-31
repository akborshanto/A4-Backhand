import express, { Request, Response } from "express";
import cors from 'cors'
import { UserRoutes } from "./module/user/user.routes";
const app = express();
app.use(express.json());
app.use(cors());
//routes
app.use('/user',UserRoutes)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World sfd');
  });
export default app;
