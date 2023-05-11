import { atom } from '../index'

test('Setting value to atom', () => {
	const myAtom = atom<number>(0);

	expect(myAtom.get()).toBe(0)

	myAtom.set(1)

	expect(myAtom.get()).toBe(1)
})