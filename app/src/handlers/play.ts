import {Router, Request, Response} from "express";
import {createGame, joinGame} from "../API/GameController";


export default function playRoutes( router: Router ){
    router.get('/play', (req: Request, res: Response) => {
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