import express from "express";
import app from "../index";

let userRouter = express.Router();

// loginRoutes(app);
// signupRoutes(app);

app.use('/user', userRouter);