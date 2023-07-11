
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

    public static async changesPerMove(gameId: number , userId : number, newPosition : number , nextTurnOrder : number , maxPlayers : number): Promise<string>{
        // change position in userGame

        try{ 
            await GameUserDB.changePositionByGameIdAndUserID(gameId , userId , newPosition)
        } catch (error) {
            console.log(error);
        }

        if(newPosition == 100){
            try{
              await GameDB.changeGameStateByGameID(gameId) 
            } catch(error){
                console.log(error);
            }
        }

        console.log("change per movr end")
        return "return"
        /*

        // winner
        

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

            */
    }

    public static async moveMyPlayer(userId: number , game : Game){
        
        var currentUserGame ;
        let currentElement ;

        let dice = this.rollDice()
       
        
        let currentPosition = 0
        let newPosition = 0
        let id_board = 0
        let nextTurnOrder = 0
        let mySteps : number[] = []

        mySteps.push(dice)

        try{
            currentUserGame = await GameUserDB.getGameUserByUserAndGameId(userId , game.id);        // retrieve game user by user id 

            
            currentPosition = currentUserGame.position
            nextTurnOrder = currentUserGame.turn_order + 1

            console.log("next turn order ", nextTurnOrder)

            newPosition = currentPosition + dice
            mySteps.push(newPosition)
            id_board = game.board_id         
            
           
            //If there is snake or ladder
            try{
            
                currentElement = await BoardDB.getBoardElementByBoardIdAndStart( id_board  , newPosition); 
                
                if (currentElement.end >= 0){
                        newPosition = currentElement.end
                        mySteps.push(newPosition)
                    }
                
                // handle if the dice will go to + 100
                if (newPosition > 100){
                    newPosition = currentUserGame.position
                    console.log(" this dice roll can't happen ")
                    mySteps.pop()
                    console.log(mySteps)
                }

            


                // change data base >> new Position , new turn , last move , active
                let s = await  this.changesPerMove(game.id , userId , newPosition , nextTurnOrder , game.players_number)
                console.log(s)
                

            } catch (error) {
                console.log(error);
            }

        } catch (error) {
                console.log(error);
            }
        
            console.log(mySteps)
        return mySteps            // return roll and new position 
    }
   


    

    public changeState(newState: boolean): void {
        // Implement the toggleState method logic
    }
}

