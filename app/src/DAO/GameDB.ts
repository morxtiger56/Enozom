import { ConnectionManager } from "./ConnectionManager";
import { Game } from "../entity/Game";
import { BoardDB } from "./BoardDB";
import { UserDB } from "./UserDB";

export class GameDB {
  async addGame(
    players_number: number,
    ownerid: number,
    state: string,
    joinedPlayers: number,
    boardid: number
  ): Promise<number> {
    try {
      const connection = await ConnectionManager.getConnection();
      const game = new Game();
      game.players_number = players_number;
      game.joined_number = joinedPlayers;
      game.state = state;

      const boardDB = new BoardDB();
      const board_id = await boardDB.getBoardById(boardid);
      if (board_id) {
        game.board_id = board_id;
      } else {
        return 0;
      }

      const userDB = new UserDB();
      const user_id = await userDB.getUserById(ownerid);
      if (user_id) {
        game.turn = user_id;
      } else {
        return 0;
      }

      await connection.manager.save(game);
      return game.id;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
