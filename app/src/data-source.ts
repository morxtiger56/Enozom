import { DataSource } from "typeorm"
import { ENTITIES } from "./entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Welcome@123",
  database: "DB_TEST",
  synchronize: true,
  logging: false,
  entities: ENTITIES,
  migrations: ["./migrations/*"],
});
