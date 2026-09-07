"use strict";
let todo = [];
const input = document.getElementById("event");
const todoList = document.getElementById("Stack");
function render() {
    todoList.innerHTML = "";
    if (todo.length === 0) {
        const emptyDiv = document.createElement("div");
        emptyDiv.id = "Empty";
        emptyDiv.textContent = "Nothing to do...";
        todoList.appendChild(emptyDiv);
        return;
    }
    const ul = document.createElement("ul");
    todo.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => {
            todo.splice(index, 1);
            render(); // Re-render to keep indices and empty state in sync
        };
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
    todoList.appendChild(ul);
}
function Addtodo() {
    const value = input.value.trim();
    if (value !== "") {
        todo.push(value);
        input.value = "";
        render();
    }
    else {
        console.warn("Input cannot be empty");
    }
}
// Allow pressing 'Enter' to add item
input === null || input === void 0 ? void 0 : input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        Addtodo();
    }
});
// Initial render
render();
