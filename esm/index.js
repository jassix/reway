import { atom } from "./atom";
const $user = atom({
    name: "Nikita",
    age: 14,
});
$user.on('name', (state) => {
    console.log("Name updated! " + state);
});
console.log($user.get());
$user.set({
    name: "Alex"
});
console.log($user.get({
    name: true
}));
//# sourceMappingURL=index.js.map