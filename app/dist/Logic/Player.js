"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor() {
        this.currentPosition = 0;
        this.isActive = false;
    }
    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
    move(position) {
        const number = this.rollDice();
        console.log(number);
    }
    toggleState(newState) {
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map