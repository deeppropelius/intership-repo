function Game(): any {

    console.log("Started");
    score();
    const GameArea = document.querySelector(".main ") as HTMLDivElement;
    const target = document.querySelector(".Target") as HTMLDivElement;
    target.style.display = "block"

    const x = Math.random() * (GameArea.clientWidth - target.clientWidth);
    const y = Math.random() * (GameArea.clientHeight - target.clientHeight);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    console.log(x, y);

    console.log("Target");



}
async function counter(): Promise<void> {
    const coun = document.getElementById("CountDown") as HTMLElement;
    const counter: string[] = ["3", "2", "1", "Go"];

    const target = document.querySelector(".Target") as HTMLDivElement;
    target.style.display = "none";

    for (const Count of counter) {
        coun.textContent = Count;
        await wait(1000);
    }

    const title = document.querySelector(".main h1") as HTMLHeadingElement;
    const countdown = document.getElementById("CountDown") as HTMLDivElement;

    title.style.display = "none";
    countdown.style.display = "none";

    let time: number = 30;

    const timer: number = setInterval(() => {
        time--;
        if (time == 0) {
            clearInterval(timer);
        }
    }, 1000);
    while (time > 0) {
        const tim = document.querySelector(".Timer") as HTMLDivElement;

        tim.textContent = `Time: ${time}`;

        Game();

        time--;

        await wait(2000);
        total += 1;
    }

    // Game is finished
    target.style.display = "none";
    target.style.backgroundColor = "red";

    countdown.textContent = "Game Over";
    countdown.style.display = "block";
}



function Start(): any {
    console.log("Game Started");
    const target = document.querySelector(".Target") as HTMLDivElement;


    counter();

}
function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//div id=Score
let totalhits: number = 0;
let total: number = 0;
let accuracy: number = (totalhits / total) * 100;
function score(): void {

    console.log("Score is called");

    const Sc = document.getElementById("Score") as HTMLDivElement;
    Sc.innerHTML = "";
    const Scor = document.createElement("div");
    const accu = document.createElement("div");
    const restart = document.createElement("div");

    restart.textContent = `Restart`;
    Scor.textContent = `Score :${totalhits}/${total}`;
    accu.textContent = `Accuaracy:${accuracy} %`;
    Sc.appendChild(Scor);
    Sc.appendChild(restart);
    Sc.appendChild(accu);
    restart.onclick = counter;

}
function AddScore(): void {
    const target = document.querySelector(".Target") as HTMLDivElement;
    target.style.backgroundColor = "green";

    totalhits++;
    total++;
    Game();

}


//fix this please
// New target always starts red
// Target turns green when hit
// Target moves after every hit
// Accuracy updates correctly
// Restart button
// No duplicate timers/countdowns