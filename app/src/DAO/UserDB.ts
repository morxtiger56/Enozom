import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

class UserDB {
    async addUser(name: string, password: string) {
        try {
            await AppDataSource.initialize();
            const user = new User();
            user.name = name;
            user.password = password;
            await AppDataSource.manager.save(user);

            return user.id;

        } catch (error) {
            console.log(error);
        }
    }
    async getUserByName(username: string) {
        try {
            const options: FindOneOptions<User> = {
                where: { name: username },
        };
        const user = await AppDataSource.manager.findOne(User, options);
        return user;
    }catch (error) {
        console.log(error);
    }
    }
    async getUserById(id: number) {
        try {
            const options: FindOneOptions<User> = {
                where: { id: id },
        };
        const user = await AppDataSource.manager.findOne(User, options);
        return user;
    }catch (error) {
        console.log(error);
    }
  }
}