"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
function wait(time = 0) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
exports.wait = wait;
