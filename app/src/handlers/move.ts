import { GameDB } from "../DAO/GameDB";
import Player from "../Logic/Player";


const server_tick = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export class MoveHandler {
    public async autoPlay(starttime: Date, gameID: number) {
        let currentGame;

        try {
            currentGame = await GameDB.getGameById(gameID);
        } catch (e) {
            console.log(e);
        }

        const lastMove: Date = currentGame.last_move;

        if (starttime.getTime() > lastMove.getTime()) {
            const result = await Player.moveMyPlayer(
                currentGame.turn,
                currentGame
            );
            const game = await this.splitMyOutput(
                result,
                currentGame.turn,
                gameID
            );
            return game;
        } else {
            return null;
        }
    }

    public async splitMyOutput(result: number[], userid, gameid) {
        let roll: number = 0;
        let steps: number[] = [];
        let nextPlayer: number = 0;
        let state: string = "";

        console.log(result);

        let currentGame;
        try {
            currentGame = await GameDB.getGameById(gameid);
        } catch (error) {
            console.log(error);
        }

        const currentTurn: number = currentGame.turn;

        if (currentTurn == userid) {
            const result = await Player.moveMyPlayer(userid, currentGame);
            roll = result[0];
            steps = result.slice(1, result.length - 1);
            nextPlayer = result[result.length - 1];

            if (steps[steps.length - 1] == 100) {
                state = "end";
            } else {
                state = "start";
            }

            const game = {
                roll,
                steps,
                turn: nextPlayer,
                state,
            };
            return game;
        }
    }

    public async move(userid, gameid, socket) {
        try {
            let currentGame;
            try {
                currentGame = await GameDB.getGameById(gameid);
            } catch (error) {
                console.log(error);
            }
            // && currentGame.state == "start"
            if (currentGame.turn == userid) {
                const result = await Player.moveMyPlayer(userid, currentGame);
                const outPut = await this.splitMyOutput(result, userid, gameid);
                console.log(outPut);

                this.broadcast(gameid, outPut, socket, userid);

                let getMyGame;

                const intervalId = setInterval(async () => {
                    try {
                        getMyGame = await GameDB.getGameById(gameid);
                    } catch (e) {
                        console.log(e);
                    }
                    const myState: string = getMyGame.state;

                    if (myState == "end") {
                        clearInterval(intervalId);
                        socket.to(gameid).emit("state", "end");
                    }
                    const autoPlayOutput = await this.autoPlay(
                        new Date(),
                        gameid
                    );
                    this.broadcast(gameid, autoPlayOutput, socket, userid);
                }, 20000);
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    public async broadcast(gameid, outPut, socket, userid) {
        console.log(gameid);
        console.log(outPut.steps);

        socket.emit("roll_number", {
            roll: outPut.roll,
            room_id: gameid,
        });
        console.log(outPut);
        const start = outPut.steps[0];
        const end1 = outPut.steps[1];
        let end2 = -1;
        console.log(start);

        if (outPut.steps.length == 3) end2 = outPut.steps[2];
        for (let i = start; i <= end1; i++) {
            console.log(i);
            socket.emit("move", {
                pos: i,
                userId: userid,
            });
            await server_tick(500);
        }
        if (end2 != -1) {
            socket.emit("move", end2);
        }
        socket.emit("new_turn", { turn: outPut.turn, room_id: gameid });
        socket.emit("state", { turn: outPut.state, room_id: gameid });
    }
}

// export default function moveRoutes(router: Router) {
//     router.post("/move", move);
// }
