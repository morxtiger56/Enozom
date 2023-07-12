import { authenticateUser } from "../services/user.services";
import moveRoutes from "../handlers/move";
import playRoutes from "../handlers/play";
import express from "express";

const gameRouter = express.Router();

gameRouter.use(authenticateUser);
playRoutes(gameRouter);
moveRoutes(gameRouter);

export default gameRouter;
