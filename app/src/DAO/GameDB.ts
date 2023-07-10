import { AppDataSource } from "../data-source";
import { Game } from "../entity/Game";
import { BoardDB } from "./BoardDB";

export class GameDB {
  async addGame(
    players_number: number,
    board: number,
    state: string,
    ownerId: number,
    joinedPlayers: number
  ) {
    try {
      await AppDataSource.initialize();
      const game = new Game();
      game.players_number = players_number;
      game.joined_number = joinedPlayers;
      var b = new BoardDB();
      let bb = await b.getBoardById(board);
      if (bb) {
        game.board_id = bb;
        return null;
      }
      await AppDataSource.manager.save(game);

      return game.id;
    } catch (error) {
      console.log(error);
    }
  }
}
