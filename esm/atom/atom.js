let atomCount = 0;
export const atom = ((...[state]) => {
    let currentState = state;
    let listeners = {};
    let activeModules = {};
    const atomIndex = `atom_${++atomCount}`;
    const methods = {
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
        set: (selected, modules) => {
            if (typeof selected == 'object') {
                currentState = {
                    ...currentState,
                    ...selected
                };
            }
            else {
                currentState = selected;
            }
            if (modules) {
                Object.keys(activeModules).map((item) => {
                    activeModules[item].map((module) => {
                        if (item == "all") {
                            module(currentState);
                        }
                        if (typeof selected == 'object') {
                            Object.keys(selected).map((selectedItem) => {
                                if (selectedItem == item) {
                                    module(currentState);
                                }
                            });
                        }
                    });
                });
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
        },
        append: (...modules) => {
            modules.map((item) => {
                if (!Array.isArray(item.affected)) {
                    if (!Array.isArray(activeModules["all"])) {
                        activeModules["all"] = [];
                    }
                    activeModules["all"].push(item.action);
                }
                else {
                    item.affected.map((affectedItem) => {
                        if (!Array.isArray(activeModules[affectedItem])) {
                            activeModules[affectedItem] = [];
                        }
                        activeModules[affectedItem].push(item.action);
                    });
                }
            });
            return {
                on: methods.on,
                set: methods.set,
                get: methods.get,
            };
        }
    };
    return methods;
});
//# sourceMappingURL=atom.js.map