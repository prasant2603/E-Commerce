import express from "express";
import { userController } from "./user.controller.js";

const usercontroller = new userController();

const userRouter = express.Router();

userRouter.post('/signup',usercontroller.signUp);
userRouter.post('/signin',usercontroller.signIn);

export default userRouter;