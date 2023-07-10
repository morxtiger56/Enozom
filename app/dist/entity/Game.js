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
exports.Game = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Board_1 = require("./Board");
let Game = exports.Game = class Game {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Game.prototype, "players_number", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, turn => turn.id),
    __metadata("design:type", User_1.User)
], Game.prototype, "turn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 10 }),
    __metadata("design:type", String)
], Game.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Game.prototype, "last_move", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Game.prototype, "joined_number", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Board_1.Board, board_id => board_id.id),
    __metadata("design:type", Board_1.Board)
], Game.prototype, "board_id", void 0);
exports.Game = Game = __decorate([
    (0, typeorm_1.Entity)()
], Game);
//# sourceMappingURL=Game.js.map