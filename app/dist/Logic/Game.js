"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor() {
        this._gameid = 1;
        this._ownerid = 0;
        this._numberOfPalyers = 2;
        this._joinedPlayers = 0;
        this._state = "pending";
        this._players = [];
        this._board = null;
        this._turn = 0;
    }
    get gameid() {
        return this._gameid;
    }
    set gameid(value) {
        this._gameid = value;
    }
    get ownerid() {
        return this._ownerid;
    }
    set ownerid(value) {
        this._ownerid = value;
    }
    get numberOfPalyers() {
        return this._numberOfPalyers;
    }
    set numberOfPalyers(value) {
        this._numberOfPalyers = value;
    }
    get joinedPlayers() {
        return this._joinedPlayers;
    }
    set joinedPlayers(value) {
        this._joinedPlayers = value;
    }
    get players() {
        return this._players;
    }
    set players(value) {
        this._players = value;
    }
    get board() {
        return this._board;
    }
    set board(value) {
        this._board = value;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    get lastMovement() {
        return this._lastMovement;
    }
    set lastMovement(value) {
        this._lastMovement = value;
    }
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
    }
    create(numberOfPalyers, board, ownerid) {
        this.state = "pending";
        this.numberOfPalyers = numberOfPalyers;
        this.ownerid = ownerid;
        this.joinedPlayers = 0;
        return this.gameid;
    }
    joinGame(gameId, playerId) {
        let thisGame = new Game();
        thisGame.players.push();
        thisGame.joinedPlayers++;
        return ("Success");
    }
    changeState(state) {
    }
    startByOwner(userid) {
        if (userid == this.ownerid) {
            this.state = "start";
        }
    }
}
//# sourceMappingURL=Game.js.map