import { Request, Response, Router } from 'express';
import { GameDB } from 'src/DAO/GameDB';
import Player from 'src/Logic/Player';


const move = async (req: Request, res: Response) => {
    try {

      let roll = 0;
      let newPosition = 0;
      let currentgame;

      const { userID , gameID } = req.body;

      console.log(userID)
      console.log(gameID)
        
      

       try {
         currentgame = await GameDB.getGameById(gameID);
       } catch (error) {
         console.log(error);
       }

       let currentPlayersNumber : number = currentgame.players_number
       let currentTurn : number = currentgame.turn


       if(currentTurn == userID ){
           const result =  Player.moveMyPlayer(userID,currentgame)
           roll = result [0]
           newPosition = result [1]
       }

        const message = {
            roll: roll,
            newPosition: newPosition
          };

        res.status(200).json(message);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};


export default function moveRoutes(router: Router) {
    router.post('/move', move);
}