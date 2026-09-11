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
