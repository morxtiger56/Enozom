import {Game} from "../Logic/Game";

export function createGame(ownerid:number, board:number, numberOfPalyers:number){
    let game=new Game()
    let gameId =game.create(ownerid, board, numberOfPalyers)
    return gameId
}

export function joinGame(gameId:number, playerId : number){
    let game=new Game()
    let check =game.joinGame(gameId,playerId)
    return check
}