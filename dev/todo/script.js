"use strict";
let todo = [];
function Addtodo() {
    const input = document.getElementById("event");
    const todolist = document.getElementById("Stack");
    const valu = input.value.trim();
    if (valu != "") {
        todo.push(valu);
    }
    else {
        console.log("Error");
    }
    todolist.innerHTML = "";
    todo.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        todolist.appendChild(li);
        const cancle = document.createElement("button");
    });
    input.value = "";
}
