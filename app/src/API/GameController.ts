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

export function joinGame(playerId : number){
    let game = new GameLogic();
    let check =game.joinGame(playerId)
    return check
}