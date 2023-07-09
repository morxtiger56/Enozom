"use strict";
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
    create() {
    }
    joinGame(newPlayer) {
    }
    changeState(state) {
    }
    addPlayerToGame(newPlayer) {
    }
    startByOwner(userid) {
    }
}
//# sourceMappingURL=Game.js.map