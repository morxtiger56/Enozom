import { Router, Request, Response } from "express";
import { createGame, joinGame, listGames } from "../API/GameController";
import { authenticatePlaying } from "../services/play.services";
import { GameDB } from "../DAO/GameDB";
import { Game } from "../entity/Game";

export default function playRoutes(router: Router) {
    router.post(
        "/play",
        authenticatePlaying,
        async (req: Request, res: Response) => {
            const query = req.query;
            const body = req.body;

            if (query.action == "create") {
                const boardid = 1;
                console.log(body);
                const game = await createGame(
                    body.userid,
                    boardid,
                    body.numberOfPalyers,
                    body.gameName
                );
                if (!game) {
                    res.status(400).json({
                        message: "Please, provide valid request!",
                    });
                    return;
                }
                res.status(200).json({
                    game: {
                        turn: 0,
                        gameId: game.id,
                        gameName: game.gameName,
                        state: game.state,
                        boardId: game.board_id.id,
                        boardUrl: game.board_id.url,
                        joinedNumber: game.joined_number,
                        playersNumber: game.players_number,
                    },
                });
            } else if (query.action == "listGames") {
                const games = await listGames();
                if (!games)
                    res.status(200).json({
                        message: "Create game instead!",
                    });
                res.status(200).json({
                    games: games.map((game) => ({
                        gameId: game.id,
                        gameName: game.gameName,
                        boardId: game.board_id.id,
                        boardUrl: game.board_id.url,
                        joinedNumber: game.joined_number,
                        playersNumber: game.players_number,
                    })),
                });
            } else if (query.action == "join") {
                const game = await joinGame(body.userid, body.gameid);
                if (!(game instanceof Game)) {
                    res.status(400).json({
                        message: "Please, provide valid request!",
                    });
                    return;
                }
                if (game.joined_number == game.players_number) {
                    game.state = "start";
                    await GameDB.changeGameStateByGameID(game.id, game.state);
                } else game.turn = 0 as any;
                res.status(200).json({
                    game: {
                        turn: game.turn,
                        gameId: game.id,
                        state: game.state,
                        boardId: game.board_id.id,
                        boardUrl: game.board_id.url,
                        joinedNumber: game.joined_number,
                        playersNumber: game.players_number,
                    },
                });
            }
        }
    );
}
