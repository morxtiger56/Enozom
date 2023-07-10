import { AppDataSource } from "../data-source";

export class ConnectionManager {
  private static connection;

  static async getConnection() {
    if (!ConnectionManager.connection) {
      ConnectionManager.connection = await AppDataSource.initialize();
    }
    return ConnectionManager.connection;
  }
}
