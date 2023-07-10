import { FindOneOptions } from "typeorm";
import { Board } from "../entity/Board";
import { ConnectionManager } from "./ConnectionManager";

export class BoardDB {
  async getBoardById(id: number) {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<Board> = {
        where: { id: id },
      };
      let board = await connection.manager.findOne(Board, options);
      return board;
    } catch (error) {
      throw new Error("Failed to get board by id: " + error.message);
    }
  }
  async addBoard(url: string) {
    try {
      const connection = await ConnectionManager.getConnection();
      const board = new Board();
      board.url = url;
      await connection.manager.save(board);
      return board.id;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return -1;
      } else {
        throw new Error("Failed to add new board: " + error.message);
      }
    }
  }
}
