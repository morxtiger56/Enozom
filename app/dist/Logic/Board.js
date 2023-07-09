"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor() {
        this._boardID = 0;
        this._imageURL = "";
        this._elements = [];
    }
    get boardID() {
        return this._boardID;
    }
    set boardID(value) {
        this._boardID = value;
    }
    get imageURL() {
        return this._imageURL;
    }
    set imageURL(value) {
        this._imageURL = value;
    }
    get elements() {
        return this._elements;
    }
    set elements(value) {
        this._elements = value;
    }
    addToElements(element) {
        this._elements.push(element);
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map