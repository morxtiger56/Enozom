import moveRoutes from "../handlers/move";
import playRoutes from "../handlers/play";
import express from "express";
import app from "../index";

let gameRouter = express.Router();

moveRoutes(gameRouter);
playRoutes(gameRouter);

app.use('/game', gameRouter);