import Player from "./Player";
import { Board } from "./Board";
import { GameDB } from "../DAO/GameDB";
import { Game } from "../entity/Game";
import { BoardDB } from "../DAO/BoardDB";
import { GameUserDB } from "../DAO/GameUserDB";

export class GameLogic {
    private _gameid: number = 1;
    private _ownerid: number = 0;
    private _numberOfPalyers: number = 2;
    private _joinedPlayers: number = 0;
    private _state: string = "pending";
    private _players: Player[] = [];
    private _board: Board | null = null;
    private _turn: number = 0;
    private _lastMovement: Date | undefined;

    // To Be Deconsted

    public get gameid(): number {
        return this._gameid;
    }
    public set gameid(value: number) {
        this._gameid = value;
    }
    public get ownerid(): number {
        return this._ownerid;
    }
    public set ownerid(value: number) {
        this._ownerid = value;
    }

    public get numberOfPalyers(): number {
        return this._numberOfPalyers;
    }
    public set numberOfPalyers(value: number) {
        this._numberOfPalyers = value;
    }

    public get joinedPlayers(): number {
        return this._joinedPlayers;
    }
    public set joinedPlayers(value: number) {
        this._joinedPlayers = value;
    }
    public get players(): Player[] {
        return this._players;
    }
    public set players(value: Player[]) {
        this._players = value;
    }

    public get board(): Board | null {
        return this._board;
    }
    public set board(value: Board | null) {
        this._board = value;
    }

  public async create(numberOfPalyers: number, board: number, ownerid: number, gameName: string) {
    const game = new GameDB();
    const gameUser = new GameUserDB();
    console.log("before add game");
    const newGame = await game.addGame(
      numberOfPalyers,
      ownerid,
      'pending',
      1,
      board,
      gameName
    );
    if (!newGame) return;
    await gameUser.addUserToGameByIds(newGame!.id, ownerid, 1);

    if (newGame.id) {
      this.gameid = newGame.id;
      return newGame;
    }

    return;
  }

    public get lastMovement(): Date | undefined {
        return this._lastMovement;
    }
    public set lastMovement(value: Date | undefined) {
        this._lastMovement = value;
    }

    public get turn(): number {
        return this._turn;
    }
    public set turn(value: number) {
        this._turn = value;
    }

    public async listPendingGames() {
        const gameDB = new GameDB();
        const pendingGames = await gameDB.QueryGameByState("pending");
        return pendingGames;
    }

    public async joinGame(playerId: number, gameId: number,socket) {
        const gameDB = new GameDB();
        const reqGame = await GameDB.getGameById(gameId);
        if (!(reqGame instanceof Game && reqGame.state == "pending")) return;
        const gameUserDB = new GameUserDB();
        if (reqGame instanceof Game) {
            reqGame.joined_number++;
            const turn = reqGame.joined_number;
            await gameUserDB.addUserToGameByIds(gameId, playerId, turn);
            await gameDB.SaveGame(reqGame);
        }
        reqGame.board_id = await new BoardDB().getBoardById(
            reqGame.board_id as any
        );

        if (reqGame.joined_number == reqGame.players_number) {
            reqGame.state = "start";
            await GameDB.changeGameStateByGameID(reqGame.id, reqGame.state);
        } else reqGame.turn = 0 as any;
        
        const game = {
                turn: reqGame.turn,
                gameId: reqGame.id,
                state: reqGame.state,
                boardId: reqGame.board_id.id,
                boardUrl: reqGame.board_id.url,
                joinedNumber: reqGame.joined_number,
                playersNumber: reqGame.players_number
        }

        socket.to(`game ${game.gameId}`).emit("add_player", game);
    }

    public startByOwner(userid: number) {
        if (userid == this.ownerid) {
            this._state = "start";
        }
    }
}
