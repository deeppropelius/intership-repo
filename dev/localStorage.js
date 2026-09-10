"use strict";
localStorage.setItem("name", "Deep");
let myname = localStorage.getItem("name");
console.log(myname);
const Deep = {
    name: "Deep ",
    suranme: "Rajput",
    age: 21
};
localStorage.clear();
localStorage.setItem("Deep", JSON.stringify(Deep));
const Data = localStorage.getItem("Deep");
if (Data) {
    const User = JSON.parse(Data);
    const displayname = document.querySelector(".myname");
    displayname.textContent = User;
    displayname.style.display = "block";
}
