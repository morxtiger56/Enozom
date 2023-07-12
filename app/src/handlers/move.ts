import { Request, Response, Router } from "express";
import { GameDB } from "../DAO/GameDB";
import Player from "../Logic/Player";

async function autoPlay(starttime: Date, gameID: number) {
    let currentGame;

    try {
        currentGame = await GameDB.getGameById(gameID);
    } catch (e) {
        console.log(e);
    }

    const lastMove: Date = currentGame.last_move;

    if (starttime.getTime() > lastMove.getTime()) {
        const result = await Player.moveMyPlayer(currentGame.turn, currentGame);
        const roll = result[0];
        const steps = result.slice(1, result.length - 1);
        const nextPlayer = result[result.length - 1];

        const game = {
            roll,
            steps,
            turn: nextPlayer,
        };

        // socket for auto play
    }
}

const move = async (req: Request, res: Response) => {
    try {
        let roll: number = 0;
        let steps: number[] = [];
        let currentGame;
        let nextPlayer: number = 0;

        const { userid, gameid } = req.body;

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

            const game = {
                roll,
                steps,
                turn: nextPlayer,
            };

            res.status(200).json({ game });

            let getMyGame;

            const intervalId = setInterval(
                async () => {
                    try {
                        getMyGame = await GameDB.getGameById(gameid);
                    } catch (e) {
                        console.log(e);
                    }
                    const myState: string = getMyGame.state;

                    if (myState == "end") {
                        clearInterval(intervalId);
                        return;
                    }
                    autoPlay(new Date(), gameid);
                },

                20000
            );
        } else {
            res.status(200).json("Sorry it's not your turn");
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

export default function moveRoutes(router: Router) {
    router.post("/move", move);
}
