let todo: string[] = [];

const input = document.getElementById("event") as HTMLInputElement;
const todoList = document.getElementById("Stack") as HTMLElement;

function render(): void {
    todoList.innerHTML = "";

    if (todo.length === 0) {
        const emptyDiv = document.createElement("div");
        emptyDiv.id = "Empty";
        emptyDiv.textContent = "Nothing to do...";
        emptyDiv.className="message"
        emptyDiv.style="text-size:50px;"
        todoList.appendChild(emptyDiv);
        return;
    }

    const ul = document.createElement("ul");
    todo.forEach((item: string, index: number) => {
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

function Addtodo(): void {
    const value: string = input.value.trim();

    if (value !== "") {
        todo.push(value);
        input.value = "";
        render();
    } else {
        console.warn("Input cannot be empty");
    }
}

// Allow pressing 'Enter' to add item
input?.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        Addtodo();
    }
});

// Initial render
render();
