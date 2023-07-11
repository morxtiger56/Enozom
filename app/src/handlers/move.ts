import { Request, Response, Router } from 'express';
import { GameDB } from '../DAO/GameDB';
import Player from '../Logic/Player';


const move = async (req: Request, res: Response) => {
    try {
      let roll : number = 0;
      let steps : number []= [];
      let currentGame;
     
      const { userID, gameID } = req.body;

      try {
        currentGame = await GameDB.getGameById(gameID);
      } catch (error) {
        console.log(error);
      }

      let currentTurn: number = currentGame.turn;

    
       if(currentTurn == userID){
           console.log("start play")
           const result =await  Player.moveMyPlayer(userID, currentGame);
           roll = result [0]
           steps = result.slice(1)

           const message = {
            roll: roll,
            steps: steps
          };

        res.status(200).json(message);
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