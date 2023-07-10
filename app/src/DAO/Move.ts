import { AppDataSource } from "src/data-source";
import { Game } from "src/entity/Game";
import { User_Game } from "src/entity/User_Game";
import { Board_Elements } from "src/entity/Board_Elements";
import { FindOneOptions } from "typeorm";


export class MoveDAO {
  
    public static async getGameById(gameId: number): Promise <Game | undefined> {
        try {
          const options: FindOneOptions<Game> = {
            where: { id: gameId },
          };
      
          const game  = await AppDataSource.manager.findOne(Game, options);
          if(game != null) return game;
        } catch (error) {
          console.log(error);
         
        }
      }

      public static async getGameUserByUserAndGameId(userId: number , gameId : number): Promise <User_Game | undefined> {
        try {
          const options: FindOneOptions<User_Game> = {
            where: { user_id: userId , game_id : gameId},
          };
      
          const user_game  = await AppDataSource.manager.findOne(User_Game, options);
          if(user_game != null) return user_game;
          
        } catch (error) {
          console.log(error);
         
        }
      }

      public static async getBoardElementByBoardIdAndStart(boardId: number , newPos : number): Promise <Board_Elements | undefined> {
        try {
          const options: FindOneOptions<Board_Elements> = {
            where: { board_id : boardId , start: newPos},
          };
      
          const ele = await AppDataSource.manager.findOne(Board_Elements, options);
          if(ele != null) return ele;
        } catch (error) {
          console.log(error);
         
        }
      }


      public static async changeGameStateByGameID(gameID : number): Promise < void> {
        const gameRepository = AppDataSource.getRepository(Game)
        
        try {
          const options: FindOneOptions<Game> = {
            where: { id : gameID },
          };
      
          const gameToUpdate = await AppDataSource.manager.findOne(Game, options);

          if (gameToUpdate){
            gameToUpdate.state = "end"
            await gameRepository.save(gameToUpdate)
          }

      
        } catch (error) {
          console.log(error);
         
        }
        
      }



      public static async changePositionByGameIdAndUserID(gameID : number , userID : number , newPos : number): Promise < void> {
        const userGameRepository = AppDataSource.getRepository(User_Game)
        
        try {
          const options: FindOneOptions<User_Game> = {
            where: { game_id : gameID , user_id : userID },
          };
      
          const userGameToUpdate = await AppDataSource.manager.findOne(User_Game, options);

          if (userGameToUpdate){
            userGameToUpdate.position = newPos 
            await userGameRepository.save(userGameToUpdate)
          }

      
        } catch (error) {
          console.log(error);
         
        }
        
      }

    
}