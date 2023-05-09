import { Atom } from "../atom";
export declare const action: <InitialState, Callback>(atom: Atom<InitialState>, callback: (args: Callback, ctx: Atom<InitialState>) => void) => (args: Callback) => void;
//# sourceMappingURL=action.d.ts.map