"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const action = (atom, callback) => {
    return (args) => {
        callback(args, atom);
    };
};
exports.action = action;
//# sourceMappingURL=action.js.map