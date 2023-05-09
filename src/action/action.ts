import {Atom} from "../atom";

export const action = <InitialState, Callback>(atom: Atom<InitialState>, callback: (args: Callback, ctx: Atom<InitialState>) => void) => {
	return (args: Callback) => {
		callback(args, atom);
	};
}