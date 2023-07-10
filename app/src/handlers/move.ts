import { Request, Response, Application } from 'express';
import { MoveDAO } from 'src/DAO/Move';
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
         currentgame = await MoveDAO.getGameById(gameID);
       } catch (error) {
         console.log(error);
       }

       let currentPlayersNumber : number = currentgame.players_number
       let currentTurn : number = currentgame.turn


       if(currentTurn == userID ){
            Player.moveMyPlayer(userID,currentgame)
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


export default function userRoutes(app: Application) {
    app.post('/game', move);
  
}