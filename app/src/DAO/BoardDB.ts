import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../data-source"
import { Game } from "../entity/Game"
import { Board } from "../entity/Board";

export class BoardDB {
    async getBoardById(id: number) {
        try {
            const options: FindOneOptions<Board> = {
                where: { id: id },
            };
            const board = await AppDataSource.manager.findOne(Board, options);
            return board;
        }catch (error) {
            console.log(error);
        }
    }
}