"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHexoid = exports.createGUID = void 0;
const hexoid_1 = require("hexoid");
const hexoidGenerator = hexoid_1.default(48);
function createGUID() {
    function S4() {
        // tslint:disable-next-line:no-bitwise
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return `${S4()}${S4()}-${S4()}-4${S4().substr(0, 3)}-${S4()}-${S4()}${S4()}${S4()}`.toLowerCase();
}
exports.createGUID = createGUID;
function createHexoid() {
    return hexoidGenerator();
}
exports.createHexoid = createHexoid;
