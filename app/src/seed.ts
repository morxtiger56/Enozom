import { AppDataSource } from "./data-source"
import { User } from './entity/User';

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new users into the database...")
    const users = [
    {
        name: "VeroVero",
        password: "123456",
        expiry_date: new Date(),
        isLogin: false,
        token_id: "loooool"
    },
    {
        name: "JohnDoe",
        password: "123456",
        expiry_date: new Date(),
        isLogin: true,
        token_id: "abc123"
    },
    {
        name: "JaneSmith",
        password: "123456",
        expiry_date: new Date(),
        isLogin: false,
        token_id: "xyz789"
    }
    ];
    for (const userData of users) {
    const user = new User();
    user.name = userData.name;
    user.password = userData.password;
    user.expiary_date = userData.expiry_date;
    user.isLogin = userData.isLogin;
    user.token_id = userData.token_id;

    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    }
    console.log("All users have been saved.");
    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
