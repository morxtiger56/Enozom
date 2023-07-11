import { Request, Response, Router } from 'express';
import { GameDB } from '../DAO/GameDB';
import Player from '../Logic/Player';


const move = async (req: Request, res: Response) => {
    try {

      let roll = 0;
      let newPosition = 0;
      let currentGame;

      const { userID, gameID } = req.body;

      try {
        let gameDB= new GameDB();
        currentGame = await gameDB.getGameById(gameID);
      } catch (error) {
        console.log(error);
      }

      let currentPlayersNumber: number = currentGame.players_number;
      let currentTurn: number = currentGame.turn;


       if(currentTurn == userID ){
           const result = Player.moveMyPlayer(userID, currentGame);
           roll = result [0]
           newPosition = result [1]
       }

        const message = {
            roll: roll,
            newPosition: newPosition
          };

        res.status(200).json(message);
    } catch (err) {
        res.status(400).json(err);
    }
};


export default function moveRoutes(router: Router) {
    router.post('/move', move);
}