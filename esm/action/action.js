export const action = (atom, callback) => {
    return (args) => {
        callback(args, atom);
    };
};
//# sourceMappingURL=action.js.map