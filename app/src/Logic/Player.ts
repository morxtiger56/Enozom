
import { BoardDB } from "../DAO/BoardDB";
import { GameDB } from "../DAO/GameDB";
import { GameUserDB } from "../DAO/GameUserDB";
import { AppDataSource } from "../data-source";
import { Board_Elements } from "../entity/Board_Elements";
import { Game } from "../entity/Game";
import { User_Game } from "../entity/User_Game";

export default class Player{


    private static rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    public static async changesPerMove(gameId: number , userId : number, newPosition : number , nextTurnOrder : number , maxPlayers : number){
        // change position in userGame
        try{
            await GameUserDB.changePositionByGameIdAndUserID(gameId , userId , newPosition)
        } catch (error) {
            console.log(error);
        }

        // winner
        if(newPosition == 100){
            try{
         
           
           await GameDB.changeGameStateByGameID(gameId) 
          // broadcast winner
            } catch(error){
                console.log(error);
            }
        }

        // change turn 
        if(nextTurnOrder > maxPlayers){
            nextTurnOrder = 1
        }

        let comingUser;
        comingUser = GameUserDB.getGameUserByGameIdAndTurnOrder(gameId , nextTurnOrder)
        try{
            await GameDB.changeGameTurnByGameID(gameId , comingUser.user_id)      
            } catch(error){
                console.log(error);
            }

        // change lastMove 
        let currentTime: Date = new Date();
        try{
            await GameDB.changelastMoveByGameId(gameId , currentTime)  
            } catch(error){
                console.log(error);
            }
    }

    public static async moveMyPlayer(userId: number , game : Game){
        
        var currentUserGame ;
        let currentElement ;

        let dice = this.rollDice()
        let currentPosition = 0
        let newPosition = 0
        let id_board = 0
        let nextTurnOrder = 0


        try{
            currentUserGame = await GameUserDB.getGameUserByUserAndGameId(userId , game.id);        // retrieve game user by user id 

            currentPosition = currentUserGame.position
            nextTurnOrder = currentUserGame.turn_order + 1

            newPosition = currentPosition + dice
            id_board = game.board_id.id            
            

            //If there is snake or ladder
            try{
                currentElement = await BoardDB.getBoardElementByBoardIdAndStart( id_board  , newPosition); 
                if (currentElement){
                    newPosition = currentElement.end
                    }
                
                // handle if the dice will go to + 100
                if (newPosition > 100){
                    newPosition = currentUserGame.position
                }


                // change data base >> new Position , new turn , last move , active
                this.changesPerMove(game.id , userId , newPosition , nextTurnOrder , game.players_number)

            } catch (error) {
                console.log(error);
            }

        } catch (error) {
                console.log(error);
            }
        
        return [ dice , newPosition ]           // return roll and new position 
    }
   


    

    public changeState(newState: boolean): void {
        // Implement the toggleState method logic
    }
}

