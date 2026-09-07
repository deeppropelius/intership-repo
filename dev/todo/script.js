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
    todo.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        const cancle = document.createElement("button");
        cancle.textContent = "X";
        cancle.onclick = () => {
            todo.splice(index, 1);
            li.remove();
        };
        li.appendChild(cancle);
        todolist.appendChild(li);
    });
    input.value = "";
}
