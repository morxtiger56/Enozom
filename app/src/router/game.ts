import { authenticateToken } from "../services";
import moveRoutes from "../handlers/move";
import playRoutes from "../handlers/play";
import express from "express";

let gameRouter = express.Router();

gameRouter.use(authenticateToken);
moveRoutes(gameRouter);
playRoutes(gameRouter);

export default gameRouter;