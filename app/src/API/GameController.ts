import { GameDB } from "src/DAO/GameDB";
import {GameLogic} from "../Logic/Game";

export function createGame(
  ownerId: number,
  board: number,
  numberOfPlayers: number
) {
  let game = new GameLogic();
  let newGame = game.create(Math.max(2, parseInt(String(numberOfPlayers)) || 0), board, ownerId)
  return newGame;
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