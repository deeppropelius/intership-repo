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



    todo.forEach((item:string , index) => {
        const li =document.createElement("li");
        li.textContent= item;
       
        const cancle = document.createElement("button");
        cancle.textContent= "X";
        cancle.onclick =()=>{
            todo.splice(index,1);
            li.remove();
        };
        li.appendChild(cancle);
        todolist.appendChild(li);        



    });
    input.value ="";
}
