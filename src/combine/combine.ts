import {atom, Atom} from "../atom";

export const combine = (keys?: string[] ,...atoms: Atom<any>[]): Atom<any> => {
	const combinedAtom = atom<any>({});

	atoms.map((item, key) => {
		if (keys && keys[key]) {
			combinedAtom.set({
				[keys[key]]: item.get()
			})
		} else {
			combinedAtom.set({
				[key]: item.get()
			})
		}

		item.on('data' as any, (state) => {
			if (keys && keys[key]) {
				combinedAtom.set({
					[keys[key]]: state
				})
			} else {
				combinedAtom.set({
					[key]: state
				})
			}
		})
	})

	return combinedAtom
}