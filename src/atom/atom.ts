import {CreateAtomParameters, Atom, AtomGetSelect, AtomListeners} from "./atom.types";

let atomCount = 0;

export const atom = (<InitialState>(...[state]: CreateAtomParameters<InitialState>): Atom<InitialState> => {
	let currentState = state;
	let listeners: AtomListeners<InitialState> = {}
	let callbacks = -1;

	const atomIndex = `atom_${++atomCount}`

	const methods: Atom<InitialState> = {
		get: (selected) => {
			if (!selected) {
				return currentState;
			}

			const result: Partial<InitialState> = {}

			Object.keys(currentState as InitialState as object).map((item) => {
				// @ts-ignore
				if (selected[item]) {
					// @ts-ignore
					result[item] = currentState[item]
				}
			})

			return result;
		},
		set: (selected, modules) => {
			if (typeof selected == 'object') {
				currentState = {
					...currentState,
					...selected
				}
			} else {
				currentState = selected as any
			}

			Object.keys(listeners).map((item) => {
				if (item == "data") {
					listeners[item].map((listenerItem) => {
						listenerItem.callback(currentState as any, listenerItem.name)
					});
					// @ts-ignore
				} else if (typeof selected == 'object' && selected[item]) {
					listeners[item].map((listenerItem) => {
						listenerItem.callback(currentState[item as keyof InitialState] as any, listenerItem.name)
					})
				}
			})
		},
		on: (method, callback) => {
			if (!Array.isArray(listeners[method as string])) {
				listeners[method as string] = []
			}

			listeners[method as string].push({
				name: atomIndex + `-on_${++callbacks}`,
				callback: callback as any
			});
		},
		unmount: (key) => {
			Object.keys(listeners).map((item) => {
				for (const listener of listeners[item]) {
					if (key == listener.name) {
						const newListeners = listeners[item].filter((obj) => obj != listener);
						listeners[item] = [...newListeners];
						--callbacks;
						return;
					}
				}
			})
		},
	}

	return methods
})