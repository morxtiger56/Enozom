import { ConnectionManager } from "./ConnectionManager";
import { FindOneOptions } from "typeorm";
import { User_Game } from "../entity/User_Game";

export class GameUserDB {

    async addUserToGameByIds(gameId: number, userId: number,turn: number) {
      console.log(userId);
        try {
            const connection = await ConnectionManager.getConnection();
            const userGame = new User_Game();
            userGame.user_id = userId ;
            userGame.game_id = gameId;
            userGame.active = true;
            userGame.turn_order= turn
            userGame.position = 0
            console.log("GameUserDB.ts", userGame);
            await connection.manager.save(userGame);
            return "Added";
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return -1;
            } else {
                throw new Error("Failed to add new user to that game: " + error.message);
            }
        }
    }
    public static async getGameUserByUserAndGameId(userId: number, gameId: number): Promise<User_Game | undefined> {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindOneOptions<User_Game> = {
                where: { user_id: userId, game_id: gameId },
            };
      
            const user_game = await connection.manager.findOne(User_Game, options);
            if (user_game != null) {
              console.log(user_game)
              return user_game;
            }
           // else return `Game with id: ${gameId} with user with id: ${userId} not found`
          
        } catch (error) {
            console.log(error);
          //  return "Error"
         
        }
    }


    public static async getGameUserByGameIdAndTurnOrder( gameId: number , turnOrder : number): Promise<User_Game | string> {
      try {
          const connection = await ConnectionManager.getConnection();
          const options: FindOneOptions<User_Game> = {
              where: { game_id: gameId , turn_order : turnOrder },
          };
    
          const user_game = await connection.manager.findOne(User_Game, options);
          if (user_game != null) return user_game;
          else return `Game with id: ${gameId} not found`
        
      } catch (error) {
          console.log(error);
          return "Error"
       
      }
  }

    public static async changePositionByGameIdAndUserID(gameID: number, userID: number, newPos: number): Promise<void> {
        const connection = await ConnectionManager.getConnection();
        const userGameRepository = connection.getRepository(User_Game) 
        try {
          
          const userGameToUpdate = await this.getGameUserByUserAndGameId(userID , gameID)
          if ( userGameToUpdate ){
            await userGameRepository.update({game_id : gameID , user_id : userID} , { position : newPos})
          }

      
        } catch (error) {
          console.log(error);
         
        }
        
      }

      public static async changeActiveByGameIdAndUserID(gameID: number, userID: number): Promise<void> {
        const connection = await ConnectionManager.getConnection();
        const userGameRepository = connection.getRepository(User_Game)
        
        try {
          const optionMovements: FindOneOptions<User_Game> = {
            where: { game_id : gameID , user_id : userID },
          };
      
          const userGameToUpdate = await connection.manager.findOne(User_Game, optionMovements);

          if (userGameToUpdate){
            userGameToUpdate.active = false 
            await userGameRepository.save(userGameToUpdate)
          }

      
        } catch (error) {
          console.log(error);
         
        }
        
      }
}