import {CreateAtomParameters, Atom, AtomGetSelect, AtomListeners} from "./atom.types";

let atomCount = 0;

export const atom = (<InitialState>(...[state]: CreateAtomParameters<InitialState>): Atom<InitialState> => {
	let currentState = state;
	let listeners: AtomListeners<InitialState> = {}
	let activeModules: any = {}

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
		set: (selected) => {
			if (typeof selected == 'object') {
				currentState = {
					...currentState,
					...selected
				}
			} else {
				currentState = selected as any
			}

			Object.keys(activeModules).map((item) => {
				activeModules[item].map((module: any) => {
					if (item == "all") {
						module(currentState);
					}

					if (typeof selected == 'object') {
						Object.keys(selected as object).map((selectedItem) => {
							if (selectedItem == item) {
								module(currentState);
							}
						})
					}
				})
			})

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
		},
		append: (...modules) => {
			modules.map((item) => {
				if (!Array.isArray(item.affected)) {
					if (!Array.isArray(activeModules["all"])) {
						activeModules["all"] = [];
					}

					activeModules["all"].push(item.action)
				} else {
					item.affected.map((affectedItem) => {
						if (!Array.isArray(activeModules[affectedItem])) {
							activeModules[affectedItem] = [];
						}

						activeModules[affectedItem].push(item.action);
					})
				}
			})

			return {
				on: methods.on,
				set: methods.set,
				get: methods.get,
			};
		}
	}

	return methods
})