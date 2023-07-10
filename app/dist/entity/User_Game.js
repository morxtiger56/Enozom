"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Game = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Game_1 = require("./Game");
let User_Game = exports.User_Game = class User_Game {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("int"),
    (0, typeorm_1.ManyToOne)(() => Game_1.Game, (game_id) => game_id.id),
    __metadata("design:type", Number)
], User_Game.prototype, "game_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)("int"),
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user_id) => user_id.id),
    __metadata("design:type", Number)
], User_Game.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean"),
    __metadata("design:type", Boolean)
], User_Game.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], User_Game.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], User_Game.prototype, "turn_order", void 0);
exports.User_Game = User_Game = __decorate([
    (0, typeorm_1.Entity)()
], User_Game);
//# sourceMappingURL=User_Game.js.map