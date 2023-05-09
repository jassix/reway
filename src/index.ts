import {atom} from "./atom";
import {action} from "./action/action";
import {combine} from "./combine/combine";

type ItemStore = {
	name: string;
	description: string;
	date: Date;
}

const $item = atom<ItemStore>({
	name: "Card",
	description: "simple card",
	date: new Date()
})

type UserStore = {
	name: string;
	age: number;
	props?: {
		mega: boolean;
	}
}

const $user = atom<UserStore>({
	name: "Nikita",
	age: 14,
})

$user.on('name', (state) => {
	console.log("Name watcher: " + state)
})

$user.on('age', (state) => {
	console.log("Age watcher: ", state)
})

$user.on('data' as any, (state) => {
	console.log("Global watcher: ", state)
})

console.log($user.get());

$user.set({
	name: "Alex",
	age: 54,
	props: {
		mega: true
	}
})

console.log($user.get());

const $userItems = combine(['user', 'item'], $user, $item)

console.log("Combined: ", $userItems.get())

$user.set({
	age: 55
})

$item.set({
	date: new Date()
})

console.log("Combined: ", $userItems.get())