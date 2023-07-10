import express from "express";
import app from "../index";

let gameRouter = express.Router();

// moveRoutes(app);
// joinRoutes(app);
// createRoutes(app);

app.use('/game', gameRouter);