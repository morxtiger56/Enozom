import { UserDB } from "./UserDB"
import { BoardDB } from "./BoardDB"
import { GameDB } from "./GameDB"

async function test() {
    let gg = new GameDB()
    let result1 = await gg.addGame(
        5, 17, "pending", 1, 1
    )
    console.log("this is result ", result1)
}

test()
