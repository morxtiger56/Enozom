import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { ConnectionManager } from "./ConnectionManager";

export  class UserDB {
  async addUser(name: string, password: string) {
    try {
      const connection = await ConnectionManager.getConnection();
      const user = new User();
      user.name = name;
      user.password = password;
      await connection.manager.save(user);
      return user.id;
    } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
        return -1;
    } else {
        throw new Error("Failed to add new user: " + error.message);
    }
    }
  }

  async getUserByName(username: string) {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<User> = {
        where: { name: username },
      };
      let user = await connection.manager.findOne(User, options);
      return user;
    } catch (error) {
        throw new Error("Failed to get user by name: " + error.message);
    }
  }

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
