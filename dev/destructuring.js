"use strict";
const User = {
    name: "Deep",
    age: 21,
    intern: true,
    location: "Surat"
};
console.log("USing destructuring...");
function printUser({ name, age, location, intern }) {
    return `User Name : ${name}\nUser age : ${age}\nUser location: ${location}\nUser InternStatus: ${intern}`;
}
console.log(printUser(User));
