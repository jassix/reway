"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atom = void 0;
let atomCount = 0;
exports.atom = ((...[state]) => {
    let currentState = state;
    let listeners = {};
    const atomIndex = `atom_${++atomCount}`;
    return {
        get: (selected) => {
            if (!selected) {
                return currentState;
            }
            const result = {};
            Object.keys(currentState).map((item) => {
                if (selected[item]) {
                    result[item] = currentState[item];
                }
            });
            return result;
        },
        set: (selected) => {
            if (typeof selected == 'object') {
                currentState = Object.assign(Object.assign({}, currentState), selected);
            }
            else {
                currentState = selected;
            }
            Object.keys(listeners).map((item) => {
                if (item == "data") {
                    listeners[item].map((callback) => {
                        callback(currentState);
                    });
                }
                else if (typeof selected == 'object' && selected[item]) {
                    listeners[item].map((callback) => {
                        callback(currentState[item]);
                    });
                }
            });
        },
        on: (method, callback) => {
            if (!Array.isArray(listeners[method])) {
                listeners[method] = [];
            }
            listeners[method].push(callback);
        }
    };
});
//# sourceMappingURL=atom.js.map