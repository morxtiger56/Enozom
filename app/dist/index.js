"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGreeting = void 0;
const Player_1 = __importDefault(require("./Logic/Player"));
function getGreeting(name) {
    const myObject = new Player_1.default();
    myObject.move(5);
    console.log("In ts");
    return `Hello, World !`;
}
exports.getGreeting = getGreeting;
const player = new Player_1.default();
console.log(player.move(5));
//# sourceMappingURL=index.js.map