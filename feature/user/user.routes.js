import express from "express";
import { UserController } from "./user.controller.js";

const usercontroller = new UserController();

const userRouter = express.Router();

userRouter.post('/signup',(req, res)=>{
    usercontroller.signUp(req, res);
});
userRouter.post('/signin',(req, res)=> {
    usercontroller.signIn(req, res);
});

export default userRouter;