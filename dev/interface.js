"use strict";
class User {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return `Greetings ` + this.name;
    }
}
const user = new User("Deep", 21);
console.log(user.greet());
