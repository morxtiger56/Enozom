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
exports.Board_Elements = void 0;
const typeorm_1 = require("typeorm");
const Board_1 = require("./Board");
let Board_Elements = exports.Board_Elements = class Board_Elements {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("int"),
    (0, typeorm_1.ManyToOne)(() => Board_1.Board, board_id => board_id.id),
    __metadata("design:type", Number)
], Board_Elements.prototype, "board_id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 1 }),
    __metadata("design:type", String)
], Board_Elements.prototype, "element", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)("int"),
    __metadata("design:type", Number)
], Board_Elements.prototype, "start", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Board_Elements.prototype, "end", void 0);
exports.Board_Elements = Board_Elements = __decorate([
    (0, typeorm_1.Entity)()
], Board_Elements);
//# sourceMappingURL=Board_Elements.js.map