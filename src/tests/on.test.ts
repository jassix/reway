import { atom } from '../index'

test('Atom listening', () => {
	const myAtom = atom<number>(0);

	myAtom.on('data', (state) => {
		expect(myAtom.get()).toBe(state)
	})

	myAtom.set(1)

	myAtom.set(2)
})