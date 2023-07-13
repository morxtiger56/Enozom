import { GameLogic } from "../Logic/Game";

export async function createGame(
    ownerId: number,
    board: number,
    numberOfPlayers: number,
    gameName: string
) {
    const game = new GameLogic();
    const newGame = await game.create(
        Math.max(2, parseInt(String(numberOfPlayers)) || 0),
        board,
        ownerId,
        gameName
    );
    return newGame;
}

export function listGames() {
    const game = new GameLogic();
    const pendingGames = game.listPendingGames();
    return pendingGames;
}

export function joinGame(playerId: number, gameId: number,socket) {
    const game = new GameLogic();
    const reqGame = game.joinGame(playerId, gameId, socket);
    return reqGame;
}
