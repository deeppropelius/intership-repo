let todo : string[]= [];
function Addtodo(): void{
    
    const input = document.getElementById("event") as HTMLInputElement;
    const todolist = document.getElementById("Stack") as HTMLUListElement;
    const valu:any = input.value.trim();

    
    if(valu != ""){
        todo.push(valu);
        
    }
    else {
        console.log("Error")
    }
    todolist.innerHTML="";
    todo.forEach((item:string) => {
        const li =document.createElement("li");
        li.textContent= item;
        todolist.appendChild(li);
        const cancle = document.createElement("button")
        



    });
    input.value ="";
}
