"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
function wait(time) {
    if (time === void 0) { time = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
exports.wait = wait;
