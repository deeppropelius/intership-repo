"use strict";
class Person {
    name = "Deep";
    age = 21;
}
const person = new Person();
try {
    console.log(person);
    console.log(person.name = "Jeeya");
    person.age = 20;
    console.log(person.age);
}
catch (error) {
    console.error(`An Error`, error);
}
