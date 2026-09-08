function Game():any{
    
    console.log("Started");
    // const totalaahits: number;
    // const total: number;
    // const accuracy: number ;
    // const score: number;
    const GameArea = document.querySelector(".main");
    const target = document.querySelector(".Target");
     

    const x = Math.random() * (GameArea.clientWidth-target.clientWidth);
    const y = Math.random()*(GameArea.clientHeight- target.clientHeight);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    console.log(x,y);

}
async function counter(){
    const coun = document.getElementById("CountDown") as HTMLElement ;
    const counter:string[]=["3","2","1","Go"];
        
        for(const Count of counter ){
        coun.textContent= Count;
       
            console.log(Count);
            coun.className="CountDown";
            await wait(1000);
        }
        
      Game();  
    }
    

function Start():any {
    console.log("Game Started");

    counter();
}
function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}