import Player from "./Player";
import {Board} from "./Board"
import {GameDB} from "../DAO/GameDB"
import {Game} from "../entity/Game";
import {GameUserDB} from "../DAO/GameUserDB";
import {BoardDB} from "../DAO/BoardDB";




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

  // To Be Deleted

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

  public get state(): string {
    return this._state;
  }
  public set state(value: string) {
    this._state = value;
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

  public async create(numberOfPalyers: number, board: number, ownerid: number) {
    let game = new GameDB();
    let gameUser = new GameUserDB();
    let id = await game.addGame(
      numberOfPalyers,
      ownerid,
      "pending",
      1,
      board
    );
    let message = await gameUser.addUserToGameByIds(id, ownerid, 1);
    console.log(message);

    if (id) {
      this.gameid = id;
      return this.gameid;
    }

    return 0;
  }

  public async listPendingGames() {
    let gameDB = new GameDB();
    let pendingGames = await gameDB.QueryGameByState("pending");
    return pendingGames
  }

  public async joinGame(playerId: number, gameId: number){
    //let gameDB = new GameDB();
    let reqGame = await GameDB.getGameById(gameId)
    let gameUserDB = new GameUserDB();
    if (reqGame instanceof Game) {
      reqGame.joined_number++;
      let turn = reqGame.joined_number;
      await gameUserDB.addUserToGameByIds(gameId, playerId, turn);
      await GameDB.SaveGame(reqGame);
    }
    return reqGame
  }

  public static changeState(state: string) {}

  public startByOwner(userid: number) {
    if (userid == this.ownerid) {
      this.state = "start";
    }
  }
}