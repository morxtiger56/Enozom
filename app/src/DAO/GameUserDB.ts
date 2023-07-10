import { ConnectionManager } from "./ConnectionManager";
import { FindOneOptions } from "typeorm";
import { User_Game } from "src/entity/User_Game";

export class GameUserDB {
  /**
   * The function adds a user to a game by their IDs and returns "Added" if successful, -1 if the user is
   * already added, and throws an error if there is a failure.
   * @param {number} gameId - The `gameId` parameter is the ID of the game to which the user will be
   * added.
   * @param {number} userId - The `userId` parameter is the ID of the user that you want to add to the
   * game.
   * @param {number} turn - The "turn" parameter represents the order in which the user will take their
   * turn in the game.
   * @returns either "Added" if the user was successfully added to the game, or -1 if there was a
   * duplicate entry error.
   */
  async addUserToGameByIds(gameId: number, userId: number, turn: number) {
    try {
      const connection = await ConnectionManager.getConnection();
      const userGame = new User_Game();
      userGame.user_id = userId;
      userGame.game_id = gameId;
      userGame.active = true;
      userGame.turn_order = turn;
      await connection.manager.save(userGame);
      return "Added";
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return -1;
      } else {
        throw new Error(
          "Failed to add new user to that game: " + error.message
        );
      }
    }
  }
  /**
   * The function `getGameUserByUserAndGameId` retrieves a specific user-game relationship based on the
   * user ID and game ID provided.
   * @param {number} userId - The userId parameter is the unique identifier of a user. It is of type
   * number.
   * @param {number} gameId - The `gameId` parameter is the unique identifier of a game. It is used to
   * search for a specific game in the database.
   * @returns a Promise that resolves to either a User_Game object or a string.
   */
  public static async getGameUserByUserAndGameId(
    userId: number,
    gameId: number
  ): Promise<User_Game | string> {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<User_Game> = {
        where: { user_id: userId, game_id: gameId },
      };

      const user_game = await connection.manager.findOne(User_Game, options);
      if (user_game != null) return user_game;
      else
        return `Game with id: ${gameId} with user with id: ${userId} not found`;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  /**
   * The function `getGameUserByGameIdAndTurnOrder` retrieves a user_game object based on the provided
   * gameId and turnOrder, or returns an error message if not found.
   * @param {number} gameId - The `gameId` parameter is a number that represents the ID of a game.
   * @param {number} turnOrder - The `turnOrder` parameter represents the order in which the users take
   * their turns in a game. It is a number that determines the sequence of players in the game.
   * @returns a Promise that resolves to either a User_Game object or a string.
   */
  public static async getGameUserByGameIdAndTurnOrder(
    gameId: number,
    turnOrder: number
  ): Promise<User_Game | string> {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<User_Game> = {
        where: { game_id: gameId, turn_order: turnOrder },
      };

      const user_game = await connection.manager.findOne(User_Game, options);
      if (user_game != null) return user_game;
      else return `Game with id: ${gameId} not found`;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  /**
   * The function `changePositionByGameIdAndUserID` updates the position of a user in a game based on the
   * game ID, user ID, and new position provided.
   * @param {number} gameID - The gameID parameter is a number that represents the ID of the game.
   * @param {number} userID - The userID parameter is the unique identifier of the user whose position
   * needs to be changed.
   * @param {number} newPos - The `newPos` parameter is the new position that you want to update for the
   * user in the specified game.
   */
  public static async changePositionByGameIdAndUserID(
    gameID: number,
    userID: number,
    newPos: number
  ): Promise<void> {
    const connection = await ConnectionManager.getConnection();
    const userGameRepository = connection.getRepository(User_Game);

    try {
      const optionMovements: FindOneOptions<User_Game> = {
        where: { game_id: gameID, user_id: userID },
      };

      const userGameToUpdate = await connection.manager.findOne(
        User_Game,
        optionMovements
      );

      if (userGameToUpdate) {
        userGameToUpdate.position = newPos;
        await userGameRepository.save(userGameToUpdate);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * The function changes the active status of a user in a game based on the game ID and user ID.
   * @param {number} gameID - The gameID parameter is a number that represents the ID of the game. It is
   * used to identify the specific game that needs to be updated.
   * @param {number} userID - The userID parameter is the unique identifier of the user whose active
   * status needs to be changed.
   */
  public static async changeActiveByGameIdAndUserID(
    gameID: number,
    userID: number
  ): Promise<void> {
    const connection = await ConnectionManager.getConnection();
    const userGameRepository = connection.getRepository(User_Game);

    try {
      const optionMovements: FindOneOptions<User_Game> = {
        where: { game_id: gameID, user_id: userID },
      };

      const userGameToUpdate = await connection.manager.findOne(
        User_Game,
        optionMovements
      );

      if (userGameToUpdate) {
        userGameToUpdate.active = false;
        await userGameRepository.save(userGameToUpdate);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
