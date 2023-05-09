"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combine = void 0;
const atom_1 = require("../atom");
const combine = (keys, ...atoms) => {
    const combinedAtom = (0, atom_1.atom)({});
    atoms.map((item, key) => {
        if (keys && keys[key]) {
            combinedAtom.set({
                [keys[key]]: item.get()
            });
        }
        else {
            combinedAtom.set({
                [key]: item.get()
            });
        }
        item.on('data', (state) => {
            if (keys && keys[key]) {
                combinedAtom.set({
                    [keys[key]]: state
                });
            }
            else {
                combinedAtom.set({
                    [key]: state
                });
            }
        });
    });
    return combinedAtom;
};
exports.combine = combine;
//# sourceMappingURL=combine.js.map