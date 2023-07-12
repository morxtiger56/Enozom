import { GameDB } from "src/DAO/GameDB";
import { UserDB } from "./UserDB";
import { BoardDB } from "./BoardDB";
import { GameUserDB } from "./GameUserDB";

async function test() {
    let gg = new GameUserDB();
    // let result1 = await gg.addGame(5, 17, "pending", 1, 1);
    let newuser = await gg.addUserToGameByIds(10, 10, 1);
    console.log("this is result ", newuser);
}

test();
