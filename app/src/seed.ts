import { BoardDB } from "./DAO/BoardDB";
import { GameDB } from "./DAO/GameDB";
import { UserDB } from "./DAO/UserDB";

class seedDB {
    private userDB: UserDB;
    private boardDB: BoardDB;
    private gameDB: GameDB;
    constructor() {
        this.userDB = new UserDB();
        this.boardDB = new BoardDB();
        this.gameDB = new GameDB();
    }

  public addUsers(): void {
    this.userDB.addUser("Vero", "123456");
    this.userDB.addUser("Salama", "123456");
    this.userDB.addUser("Peter", "123456");
    this.userDB.addUser("Salah", "123456");
    this.userDB.addUser("Abdelaziz", "123456");

    console.log("Users added successfully");
  }
  public addBoards(): void {
    this.boardDB.addBoard("https://www.orchidsinternationalschool.com/wp-content/uploads/2022/10/1.png");
    console.log("boards added successfully");
  }
    
  public addGames(): void {
      this.gameDB.addGame(
        5, 17, "pending", 1, 1
      )
      console.log("games added successfully");
  }
}

const seed = new seedDB();
seed.addUsers();
seed.addBoards();
seed.addGames();
