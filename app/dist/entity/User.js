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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = exports.User = class User {
    static getTableSchema() {
        return new typeorm_1.Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "256",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "token_id",
                    type: "varchar",
                },
                {
                    name: "expiary_date",
                    type: "timestamp",
                },
                {
                    name: "isLogin",
                    type: "boolean",
                },
            ],
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 256 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "token_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Date)
], User.prototype, "expiary_date", void 0);
__decorate([
    (0, typeorm_1.Column)("bool", { default: null }),
    __metadata("design:type", Boolean)
], User.prototype, "isLogin", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name'])
], User);
//# sourceMappingURL=User.js.map