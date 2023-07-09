"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log("hi");
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const message = "Successfully added the user";
    res.status(200).json({ message });
});
app.post("/signIn", (req, res) => {
    const { username, password } = req.body;
    console.log("sign in");
    const message = "Successfully signed in";
    res.status(200).json({ message });
});
app.get("/signout", (req, res) => {
    const message = "Successfully signed out";
    res.status(200).json({ message });
});
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
//# sourceMappingURL=index.js.map