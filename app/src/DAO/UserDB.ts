import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { ConnectionManager } from "./ConnectionManager";

export class UserDB {
  async addUser(name: string, password: string) {
    try {
      const connection = await ConnectionManager.getConnection();
      const user = new User();
      user.name = name;
      user.password = password;
      await connection.manager.save(user);
      return user.id;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return -1;
      } else {
        throw new Error("Failed to add new user: " + error.message);
      }
    }
  }

  /**
   * The function `getUserByName` retrieves a user from the database based on their username.
   * @param {string} username - The `username` parameter is a string that represents the name of the
   * user you want to retrieve from the database.
   * @returns a Promise that resolves to a User object.
   */
  async getUserByName(username: string) {
    try {
      console.log(username)
      const connection = await ConnectionManager.getConnection();
      console.log(connection)
      const options: FindOneOptions<User> = {
        where: { name: username },
      };
      let user = await connection.manager.findOne(User, options);
      console.log(user)
      return user;
    } catch (error) {
      throw new Error("Failed to get user by name: " + error.message);
    }
  }

  /**
   * The function retrieves a user from the database based on their ID.
   * @param {number} id - The `id` parameter is the unique identifier of the user you want to retrieve
   * from the database. It is of type `number`.
   * @returns The `getUserById` function returns a `Promise` that resolves to a `User` object.
   */
  async getUserById(id: number) {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<User> = {
        where: { id: id },
      };
      const user = await connection.manager.findOne(User, options);
      return user;
    } catch (error) {
      throw new Error("Failed to get user by ID: " + error.message);
    }
  }
}
