import { BoardDB } from "./DAO/BoardDB";
import { GameDB } from "./DAO/GameDB";
import { GameUserDB } from "./DAO/GameUserDB";
import { UserDB } from "./DAO/UserDB";

class seedDB {
    private userDB: UserDB;
    private boardDB: BoardDB;
    private gameDB: GameDB;
    private gameUser: GameUserDB;
    constructor() {
        this.userDB = new UserDB();
        this.boardDB = new BoardDB();
        this.gameDB = new GameDB();
        this.gameUser = new GameUserDB();
    }

    public async addUsers(): Promise<void> {
        await this.userDB.addUser("Vero", "123456");
        await this.userDB.addUser("Salama", "123456");
        await this.userDB.addUser("Peter", "123456");
        await this.userDB.addUser("Salah", "123456");
        await this.userDB.addUser("Abdelaziz", "123456");

        console.log("Users added successfully");
    }
    public async addBoards(): Promise<void> {
        await this.boardDB.addBoard(
            "https://www.orchidsinternationalschool.com/wp-content/uploads/2022/10/1.png"
        );
        console.log("boards added successfully");
    }

    public async addGames(): Promise<void> {
        await this.gameDB.addGame(5, 1, "pending", 1, 1, "Paris");
        await this.gameDB.addGame(7, 2, "pending", 1, 1, "Cairo");
        await this.gameDB.addGame(3, 3, "pending", 1, 1, "Moscow");
        console.log("games added successfully");
    }

    public async addBoardElements(): Promise<void> {
        await BoardDB.addElement(1, {element: 'l', start: 1, end: 38 })
        await BoardDB.addElement(1, {element: 'l', start: 4, end: 14})
        await BoardDB.addElement(1, {element: 's', start: 17, end: 7})
        await BoardDB.addElement(1, {element: 'l', start: 9, end: 31})
        await BoardDB.addElement(1, {element: 'l', start: 28, end: 84})
        await BoardDB.addElement(1, {element: 'l', start: 21, end: 42})
        await BoardDB.addElement(1, {element: 'l', start: 51, end: 67})
        await BoardDB.addElement(1, {element: 'l', start: 72, end: 91})
        await BoardDB.addElement(1, {element: 'l', start: 80, end: 99})
        await BoardDB.addElement(1, {element: 's', start: 54, end: 34})
        await BoardDB.addElement(1, {element: 's', start: 62, end: 18})
        await BoardDB.addElement(1, {element: 's', start: 64, end: 60})
        await BoardDB.addElement(1, {element: 's', start: 98, end: 79})
        await BoardDB.addElement(1, {element: 's', start: 95, end: 75})
        await BoardDB.addElement(1, {element: 's', start: 87, end: 45})
        await BoardDB.addElement(1, {element: 's', start: 92, end: 73})

        console.log("elements added successfully");
    }

    public async addUserGame(): Promise<void> {
        await this.gameUser.addUserToGameByIds(1, 2, 2);
        await this.gameUser.addUserToGameByIds(2, 1, 2);
        await this.gameUser.addUserToGameByIds(3, 4, 2);
        console.log("users added to games successfully");
    }
}

async function run() {
    const seed = new seedDB();
    await seed.addUsers();
    await seed.addBoards();
    await seed.addGames();
    await seed.addBoardElements();
    await seed.addUserGame();
    process.exit()
}

run()