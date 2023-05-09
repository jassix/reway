import {CreateAtomParameters, Atom, AtomGetSelect, AtomListeners} from "./atom.types";

let atomCount = 0;

export const atom = (<InitialState>(...[state]: CreateAtomParameters<InitialState>): Atom<InitialState> => {
	let currentState = state;
	let listeners: AtomListeners<InitialState> = {}

	const atomIndex = `atom_${++atomCount}`

	return {
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
		set: (selected) => {
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
					listeners[item].map((callback: any) => {
						callback(currentState)
					});
					// @ts-ignore
				} else if (typeof selected == 'object' && selected[item]) {
					listeners[item].map((callback: any) => {
						callback(currentState[item as keyof InitialState])
					})
				}
			})
		},
		on: (method, callback) => {
			if (!Array.isArray(listeners[method as string])) {
				listeners[method as string] = []
			}

			listeners[method as string].push(callback as any);
		}
	}
})