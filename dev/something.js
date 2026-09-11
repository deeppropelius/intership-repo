"use strict";
const arry = ["Red", "Blue", "Green"];
arry.forEach(function (color) {
    console.log(color);
});
function myfunction(color) {
    console.log(`The color is ${color}`);
}
console.log("Function Declared Outside");
arry.forEach(myfunction);
var User = [
    { name: "Deep ", age: 21 },
    { name: "Jeeya", age: 20 }
];
var user = User.map(function (name) {
    return name.name;
});
console.log(`Using map \n Users ${user}`);
