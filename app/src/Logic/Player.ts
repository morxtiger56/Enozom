
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

    public static async changesPerMove(gameId: number , userId : number, newPosition : number , 
                                        nextTurnOrder : number , maxPlayers : number): Promise<number>{
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
            } catch(error){
                console.log(error);
            }
        }

          // change turn 
        
        if(nextTurnOrder > maxPlayers){
            nextTurnOrder = 1
        }
        console.log("next turn order = ", nextTurnOrder)

        let comingUser;
        comingUser = await GameUserDB.getGameUserByGameIdAndTurnOrder(gameId , nextTurnOrder)

        console.log("next playerr ", comingUser)
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

        
        return comingUser.user_id
       
    }

    public static async moveMyPlayer(userId: number , game : Game){
        
        var currentUserGame ;
        let currentElement ; 
        let currentPosition = 0
        let newPosition = 0
        let id_board = 0
        let nextTurnOrder = 0
        let isActive = 1
        let mySteps : number[] = []

        if(game.state !="end"){

            try{
                currentUserGame = await GameUserDB.getGameUserByUserAndGameId(userId , game.id);        // retrieve game user by user id 
    
                isActive = currentUserGame.active
    
               
                 //   let dice = this.rollDice()
                   let dice = 5
                    mySteps.push(dice)
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
                        let nexTID = await  this.changesPerMove(game.id , userId , newPosition , nextTurnOrder , game.players_number)
                        console.log(nexTID)
                        mySteps.push(nexTID)
    
                    } catch (error) {
                        console.log(error);
                    }
                    
            } catch (error) {
                    console.log(error);
                }
            

        }

       
            console.log(mySteps)
        return mySteps            // return roll and new position 
    }
   


    

    public changeState(newState: boolean): void {
        // Implement the toggleState method logic
    }
}

