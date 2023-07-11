import path from "path";
import { DataSource } from "typeorm";
import config from "./config/config";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.MySQL_HOST,
    port: config.MySQL_PORT,
    username: config.MySQL_USER,
    password: config.MySQL_PASSWORD,
    database: config.MySQL_DB_TEST,
    synchronize: true,
    logging: false,
    entities: [path.resolve("./entity/**/*.js")],
    migrations: ["./migration/**/*.js"],
})
