import {Router, Request, Response} from "express";
import {createGame, joinGame, listGames,} from "../API/GameController";
import { authenticatePlaying } from "../services/play.services";
import { BoardDB } from "../DAO/BoardDB";
import { GameDB } from "../DAO/GameDB";
import { Game } from "../entity/Game";


export default function playRoutes( router: Router ){
    router.get('/play', authenticatePlaying, async (req: Request, res: Response) => {
        const query = req.query
        const body = req.body

        if(query.action=='create'){
            let boardid = await BoardDB.getRandomBoard();
            let game = await createGame(body.userid, boardid, body.numberOfPalyers);
            if (!game) {
                res.status(400).json({
                    message: "Please, provide valid request!"
                });
                return;
            };
            res.status(200).json({
                game: {
                    turn: 0,
                    gameid: game.id,
                    gamestate: game.state,
                    boardid: game.board_id.id,
                    boardurl: game.board_id.url,
                    joinednumber: game.joined_number,
                    playersnumber: game.players_number,
                }
            });
        }
        else if(query.action=='listGames'){
            let games = await listGames();
            res.status(200).json({
                games: games.map(game =>
                    ({
                        gameid: game.id,
                        boardid: game.board_id.id,
                        boardurl: game.board_id.url,
                        joinednumber: game.joined_number,
                        playersnumber: game.players_number,
                    })
                )
            });
        }
        else if(query.action=='join'){
            let game = await joinGame(body.userid, body.gameid )
            if (!(game instanceof Game)) {
                res.status(400).json({
                    message: "Please, provide valid request!"
                });
                return;
            }
            if (game.joined_number == game.players_number) {
                game.state = "start";
                await GameDB.changeGameStateByGameID(game.id, game.state);
            } else game.turn.id = 0;
            res.status(200).json({
                game: {
                    turn: game.turn,
                    gameid: game.id,
                    gamestate: game.state,
                    boardid: game.board_id.id,
                    boardurl: game.board_id.url,
                    joinednumber: game.joined_number,
                    playersnumber: game.players_number,
                }
            });
        }
    })
}