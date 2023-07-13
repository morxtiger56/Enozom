import { authenticateUserMiddleware } from "../services/user.services";
<<<<<<< HEAD

=======
>>>>>>> salah
import playRoutes from "../handlers/play";
import express from "express";

const gameRouter = express.Router();

gameRouter.use(authenticateUserMiddleware);
playRoutes(gameRouter);
<<<<<<< HEAD
//moveRoutes(gameRouter);
=======
>>>>>>> salah

export default gameRouter;
