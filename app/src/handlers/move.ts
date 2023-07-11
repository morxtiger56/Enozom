import { Request, Response, Router } from 'express';
import { GameDB } from '../DAO/GameDB';
import Player from '../Logic/Player';
import { Game } from 'src/entity/Game';



async function autoPlay( starttime : Date , gameID : number ){
    console.log("Auto Play")
    
    let currentGame

    try{
      currentGame = await GameDB.getGameById(gameID);
    }catch(e){
      console.log("3aaaaaaaaaaa")
    }
    
      let lastMove : Date = currentGame.last_move

      console.log("start time ",starttime)
      console.log("last time ",lastMove)

      if(starttime.getTime() > lastMove.getTime()){

        console.log("verooooo")

        const result = await  Player.moveMyPlayer(currentGame.turn, currentGame);
        let roll = result [0]
        let steps = result.slice(1,result.length-1)
        let nextPlayer = result[result.length-1]

        const message = {
          roll: roll,
          steps: steps,
          nextPlayerId : nextPlayer
        };

        console.log(message)

        

      }else{
        console.log("Doesn't work")
      }
} 

const move = async (req: Request, res: Response) => {
    try {
      let roll : number = 0;
      let steps : number [] = [];
      let currentGame;
      let nextPlayer : number =0
     
      const { userID, gameID } = req.body;

      try {
        let gameDB= new GameDB();
        currentGame = await gameDB.getGameById(gameID);
      } catch (error) {
        console.log(error);
      }

      let currentTurn: number = currentGame.turn;

    
       if(currentTurn == userID){
           console.log("start play")
           const result = await  Player.moveMyPlayer(userID, currentGame);
           roll = result [0]
           steps = result.slice(1,result.length-1)
           nextPlayer = result[result.length-1]

           const message = {
            roll: roll,
            steps: steps,
            nextPlayerId : nextPlayer
          };
        
        res.status(200).json(message);

        //let start : Date = new Date()
        //console.log(start)
        let getMyGame 

        let intervalId = setInterval(async () => {
          // Your logic here
          try{

            getMyGame= await GameDB.getGameById(gameID);
          }catch(e){
            console.log("")
          }
            let myState : string = getMyGame.state
              
            autoPlay(  new Date () , gameID);
            
            if (myState == "end") {
              clearInterval(intervalId); // Stop the interval execution
            }
          }
          
        , 5000);

       

       }else{
        res.status(200).json("Sorry it's not your turn");
       }

        
    } catch (err) {
        res.status(400).json(err);
    }
};


export default function moveRoutes(router: Router) {
    router.post('/move', move);
}