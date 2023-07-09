"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting a new users into the database...");
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
        const user = new User_1.User();
        user.name = userData.name;
        user.password = userData.password;
        user.expiary_date = userData.expiry_date;
        user.isLogin = userData.isLogin;
        user.token_id = userData.token_id;
        yield data_source_1.AppDataSource.manager.save(user);
        console.log("Saved a new user with id: " + user.id);
    }
    console.log("All users have been saved.");
    console.log("Here you can setup and run express / fastify / any other framework.");
})).catch(error => console.log(error));
//# sourceMappingURL=seed.js.map