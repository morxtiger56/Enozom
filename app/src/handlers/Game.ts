import {Application, Request, Response} from "express";
import {createGame, joinGame} from "../API/GameController";


export function gameRoutes( app: Application ){
    app.get('/game', (req: Request, res: Response) => {
        const query = req.query
        const body = req.body

        if(query.action=='create'){
            let gameId =createGame(body.ownerid,body.board,body.numberOfPalyers)
            res.status(200).json({gameId});
        }
        else if(query.action=='join'){
            let message = joinGame(body.gameId,body.payerId)
        }

    })
}