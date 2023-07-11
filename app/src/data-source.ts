import { DataSource } from "typeorm";
import config from "./config/config";
import { User } from "./entity/User";
import { Game } from "./entity/Game";
import { Board_Elements } from "./entity/Board_Elements";
import { Board } from "./entity/Board";
import { User_Game } from "./entity/User_Game";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.MySQL_HOST,
    port: config.MySQL_PORT,
    username: config.MySQL_USER,
    password: config.MySQL_PASSWORD,
    database: config.MySQL_DB_TEST,
    synchronize: true,
    logging: false,
    // entities: ["./entity/**/*.js"],
    entities: [Game, Board_Elements, Board, User_Game, User],
    migrations: ["./migration/**/*.js"],
})
