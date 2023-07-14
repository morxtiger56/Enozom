import { Request, Response, NextFunction } from "express";
import { GameUserDB } from "../DAO/GameUserDB";
import { BoardDB } from "../DAO/BoardDB";
import { GameDB } from "../DAO/GameDB";

export async function authenticatePlaying(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const GameUserStore = new GameUserDB();
        const isUserPlaying = await GameUserStore.isThereActiveGamesForUserid(
            req.body.userid
        );
        if (isUserPlaying) {
                const game = await GameDB.getGameById(req.body.userid);
                if (typeof game === "string") return res.status(401).json("game not found");
                game.board_id = await new BoardDB().getBoardById(
                    game.board_id as any
                );
                return res.status(200).json( { game });
        }
        next();
    } catch (err) {
        res.status(401);
        res.json(err);
    }
}
