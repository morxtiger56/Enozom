import express from "express";
import loginRoutes from "../handlers/login";
import signupRoutes from "../handlers/signup";

const userRouter = express.Router();

loginRoutes(userRouter);
signupRoutes(userRouter);

export default userRouter;