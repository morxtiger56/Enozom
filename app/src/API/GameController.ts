import { GameDB } from "src/DAO/GameDB";
import {GameLogic} from "../Logic/Game";

export function createGame(
  ownerId: number,
  board: number,
  numberOfPlayers: number
) {
  let game = new GameLogic();
  let gameId = game.create(ownerId, board, numberOfPlayers);
  return gameId;
}

export function listGames(){
    let game = new GameLogic();
    let pendingGames =game.listPendingGames()
    return pendingGames
}

export function joinGame(playerId: number, gameId: number){
    let game = new GameLogic();
    let reqGame =game.joinGame(playerId,gameId)
    return reqGame
}