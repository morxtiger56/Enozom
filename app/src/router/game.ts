import { authenticateUserMiddleware } from "../services/user.services";
import playRoutes from "../handlers/play";
import express from "express";

const gameRouter = express.Router();

gameRouter.use(authenticateUserMiddleware);
playRoutes(gameRouter);

export default gameRouter;
