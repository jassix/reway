import { atom } from "../atom";
export const combine = (keys, ...atoms) => {
    const combinedAtom = atom({});
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
//# sourceMappingURL=combine.js.map