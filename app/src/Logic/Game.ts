import Player from "./Player";
import {Board} from "./Board"



class Game {
    
    private _gameid: number = 1;
    private _ownerid: number = 0; 
    private _numberOfPalyers: number = 2;
    private _joinedPlayers: number = 0;
    private _state: string = "pending";
    private _players: Player[] = [];    
    private _board: Board | null = null;
    private _turn: number = 0
    private _lastMovement: Date | undefined


    

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
        return this._lastMovement
    }
    public set lastMovement(value: Date | undefined) {
        this._lastMovement = value
    }

    public get turn(): number {
        return this._turn
    }
    public set turn(value: number) {
        this._turn = value
    }

    public create(numberOfPalyers:number, board:number,ownerid:number): number{
        this.state="pending"
        this.numberOfPalyers=numberOfPalyers
        //this.board= return board from DAO
        this.ownerid=ownerid
        this.joinedPlayers=0
        //this.gameid = created from DAO
        return this.gameid;
    }

    public joinGame(gameId:number, playerId : number){
        let thisGame: Game=new Game()
        // get game from DAO using gameId
        // get player from DAO by playerId
        thisGame.players.push()
        thisGame.joinedPlayers++
        // write in User_Game
        return("Success")


    }

    public changeState(state : string){
        this.state=state
    }

    public startByOwner (userid : number){
        if(userid==this.ownerid){
            this.state="start"
        }
    }


}