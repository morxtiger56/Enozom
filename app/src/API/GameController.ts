import {Game} from "../Logic/Game";

export function createGame(
  ownerId: number,
  board: number,
  numberOfPlayers: number
) {
  let game = new Game();
  let gameId = game.create(ownerId, board, numberOfPlayers);
  return gameId;
}

export function joinGame(gameId:number, playerId : number){
    let game=new Game()
    let check =game.joinGame(gameId,playerId)
    return check
}