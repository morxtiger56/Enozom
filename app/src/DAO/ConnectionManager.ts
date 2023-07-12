import { AppDataSource } from '../data-source';

/* The ConnectionManager class provides a static method to get a connection to the AppDataSource. */
export class ConnectionManager {
  private static connection;

  static async getConnection() {
    if (!ConnectionManager.connection) {
      ConnectionManager.connection = await AppDataSource.initialize();
    }
    return ConnectionManager.connection;
  }
}
