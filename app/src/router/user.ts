import express from "express";
import app from "../index";
import loginRoutes from "../handlers/login";
import signupRoutes from "../handlers/signup";

let userRouter = express.Router();

loginRoutes(userRouter);
signupRoutes(userRouter);

app.use('/user', userRouter);