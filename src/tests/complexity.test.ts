import {atom, combine} from '../index'

test('Atom complexity', () => {
	const start = Date.now();
	const name = atom<string>("Jack");
	const age = atom<number>(26);

	const person = combine(['name', 'age'], name, age);

	expect(person.get().name).toBe("Jack")
	expect(person.get().age).toBe(26)

	name.set("Mike");
	age.set(31);

	expect(person.get().name).toBe("Mike")
	expect(person.get().age).toBe(31)

	const user = combine(['account'], person)

	for (let i = 0; i <= 1; i++) {
		user.on("data" as any, (state, ctx) => {
			console.log(i + ", User update:", Date.now() - start)
		})
	}

	name.set("Sam")
})