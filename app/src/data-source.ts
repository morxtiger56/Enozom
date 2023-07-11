import config from "./config/config";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Game } from "./entity/Game";
import { Board } from "./entity/Board";
import { User_Game } from "./entity/User_Game";
import { Board_Elements } from "./entity/Board_Elements";



export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.MySQL_HOST,
    port: config.MySQL_PORT,
    username: config.MySQL_USER,
    password: config.MySQL_PASSWORD,
    database: config.MySQL_DB_TEST,
    synchronize: false,
    migrationsRun: true,
    logging: false,
    entities: [Game, Board_Elements, Board, User_Game, User],
    migrations: ["./migration/**/*.js"],
})
