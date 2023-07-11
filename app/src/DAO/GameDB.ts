import { ConnectionManager } from "./ConnectionManager";
import { Game } from "../entity/Game";
import { BoardDB } from "./BoardDB";
import {UserDB }from "./UserDB";
import { FindManyOptions, FindOneOptions } from "typeorm";

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

      let newGame = await connection.manager.save(game);
      return newGame.id;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
  public static async getGameById(gameId: number): Promise<Game | string> {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<Game> = {
        where: { id: gameId },
      };

      const game = await connection.manager.findOne(Game, options);
      if (game != null) return game;
      else return `Game with id: ${gameId} not found`;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
      public static async changeGameStateByGameID(gameID : number): Promise < string> {
        try {
          const connection = await ConnectionManager.getConnection();
          const options: FindOneOptions<Game> = {
            where: { id : gameID },
          };
      
          

      const gameToUpdate = await connection.manager.findOne(Game, options);

      if (gameToUpdate) {
        gameToUpdate.state = "end";
        await connection.save(gameToUpdate);
        return "Updated successfully";
      } else {
        return `Game with id: ${gameID} not found`;
      }
    } catch (error) {
      throw error;
    }
  }

  public static async changeGameTurnByGameID(
    gameID: number,
    turn: number
  ): Promise<string> {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<Game> = {
        where: { id: gameID },
      };

      const gameToUpdate = await connection.manager.findOne(Game, options);

      if (gameToUpdate) {
        gameToUpdate.turn.id = turn;
        await connection.save(gameToUpdate);
        return "Updated successfully";
      } else {
        return `Game with id: ${gameID} not found`;
      }
    } catch (error) {
      throw error;
    }
  }

  public static async changelastMoveByGameId(
    gameID: number,
    lastTime: Date
  ): Promise<string> {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<Game> = {
        where: { id: gameID },
      };

      const gameToUpdate = await connection.manager.findOne(Game, options);

      if (gameToUpdate) {
        gameToUpdate.last_move = lastTime;
        await connection.save(gameToUpdate);
        return "Updated successfully";
      } else {
        return `Game with id: ${gameID} not found`;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * QueryGame
   */
  async QueryGameByState(state: string) {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindManyOptions<Game> = {
        where: {
          state,
        },
      };

      const games = await connection.manager.find(Game, options);
      if (!games || games.length === 0) {
        return "No Pending Games";
      }
      return games;
    } catch (error) {
      throw error;
    }
  }

  async SaveGame(game: Game) {
    try {
      const connection = await ConnectionManager.getConnection();
      await connection.manager.save(game);
    } catch (error) {
      throw error;
    }
  }
}
