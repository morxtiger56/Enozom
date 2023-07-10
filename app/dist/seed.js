"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BoardDB_1 = require("./DAO/BoardDB");
const GameDB_1 = require("./DAO/GameDB");
const UserDB_1 = require("./DAO/UserDB");
class seedDB {
    constructor() {
        this.userDB = new UserDB_1.UserDB();
        this.boardDB = new BoardDB_1.BoardDB();
        this.gameDB = new GameDB_1.GameDB();
    }
    addUsers() {
        this.userDB.addUser("Vero", "123456");
        this.userDB.addUser("Salama", "123456");
        this.userDB.addUser("Peter", "123456");
        this.userDB.addUser("Salah", "123456");
        this.userDB.addUser("Abdelaziz", "123456");
        console.log("Users added successfully");
    }
    addBoards() {
        this.boardDB.addBoard("https://www.orchidsinternationalschool.com/wp-content/uploads/2022/10/1.png");
        console.log("boards added successfully");
    }
    addGames() {
        this.gameDB.addGame(5, 17, "pending", 1, 1);
        console.log("games added successfully");
    }
}
const seed = new seedDB();
seed.addUsers();
seed.addBoards();
seed.addGames();
//# sourceMappingURL=seed.js.map