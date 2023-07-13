import express, { Request, Response, Application } from "express";
import userRouter from "./router/user";
import gameRouter from "./router/game";
import config from "./config/config";
import bodyParser from "body-parser";
import cors from "cors";
import {GameLogic} from "./Logic/Game";
import {GameDB} from "./DAO/GameDB";
import Player from "./Logic/Player";
import {MoveHandler} from "./handlers/move";
const http = require("http");
const { Server } = require("socket.io");



const { PORT, HOST } = config;
const app: Application = express();
const address = `http://${HOST}:${PORT}`;

const corsOptions = {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/user", userRouter);
app.use("/game", gameRouter);

app.get("/", (_req: Request, res: Response) => {
    res.send({
        message: "Welcome to the API",
    });
});



const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    let timer = null;
    socket.on("join_game", (data) => {
        socket.join(data.gameId);
        socket.to(data.gameId).emit("add_player", "Player is added")
    });

    socket.on("move", (body) => {
        let userId =0
        let gameId = 0


        let moveHandler = new MoveHandler()
         moveHandler.move(userId, gameId, socket)




    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});


app.listen(PORT, () => {
    console.log(`Server is running on ${address}`);
});

export default app;
