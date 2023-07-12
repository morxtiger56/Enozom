import { Request, Response, NextFunction } from 'express';
import {GameUserDB} from "../DAO/GameUserDB";

export async function authenticatePlaying (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const GameUserStore = new GameUserDB();
        let isUserPlaying = await GameUserStore.isThereActiveGamesForUserid(req.body.userid);
        if (isUserPlaying) {
            return res.status(403).json({
                message: "User already in a game!"
            });
        }
        next();
    } catch (err) {
        res.status(401);
        res.json(err);
    }
};