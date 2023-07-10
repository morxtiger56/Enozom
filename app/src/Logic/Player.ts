import { MoveDAO } from "src/DAO/Move";
import { AppDataSource } from "src/data-source";
import { Board_Elements } from "src/entity/Board_Elements";
import { Game } from "src/entity/Game";
import { User_Game } from "src/entity/User_Game";

export default class Player{


    private static rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    public static async changesPerMove(gameId: number , userId : number, newPosition : number , nextTurnOrder : number , maxPlayers : number){
        if(newPosition == 100){
            console.log("some one End Game")

            try{
                await MoveDAO.changeGameStateByGameID(gameId);
            } catch (error) {
                console.log(error);
            }
        }


        try{
            await MoveDAO.changePositionByGameIdAndUserID(gameId , userId , newPosition)
        } catch (error) {
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
            currentUserGame = await MoveDAO.getGameUserByUserAndGameId(userId , game.id);        // retrieve game user by user id 

            currentPosition = currentUserGame.position
            nextTurnOrder = currentUserGame.turn_order + 1

            newPosition = currentPosition + dice
            //id_board = game.board_id            // aih alksa de 
            

            // hshof lw fe snacke aw ladder
            try{
                currentElement = await MoveDAO.getBoardElementByBoardIdAndStart( id_board  , newPosition); 
                if (currentElement){
                    newPosition = currentElement.end

                    }


            } catch (error) {
                console.log(error);
            }

        } catch (error) {
                console.log(error);
            }

    }
   


    

    public changeState(newState: boolean): void {
        // Implement the toggleState method logic
    }
}

