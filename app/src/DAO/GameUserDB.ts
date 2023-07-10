import { ConnectionManager } from "./ConnectionManager";
import { FindOneOptions } from "typeorm";
import { User_Game } from "src/entity/User_Game";

export class GameUserDB {
    public static async getGameUserByUserAndGameId(userId: number, gameId: number): Promise<User_Game | string> {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindOneOptions<User_Game> = {
                where: { user_id: userId, game_id: gameId },
            };
      
            const user_game = await connection.manager.findOne(User_Game, options);
            if (user_game != null) return user_game;
            else return `Game with id: ${gameId} with user with id: ${userId} not found`
          
        } catch (error) {
            console.log(error);
            return "Error"
         
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
          const optionMovements: FindOneOptions<User_Game> = {
            where: { game_id : gameID , user_id : userID },
          };
      
          const userGameToUpdate = await connection.manager.findOne(User_Game, optionMovements);

          if (userGameToUpdate){
            userGameToUpdate.position = newPos 
            await userGameRepository.save(userGameToUpdate)
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