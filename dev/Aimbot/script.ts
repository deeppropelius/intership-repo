let totalhits: number = 0;
let total: number = 0;
let isPlaying: boolean = false;
let currentGameId: number = 0;

function Game(): void {
    const GameArea = document.querySelector(".main") as HTMLDivElement;
    const target = document.querySelector(".Target") as HTMLDivElement;

    target.style.backgroundColor = "red";
    target.style.display = "block";

    const maxX = GameArea.clientWidth - target.clientWidth;
    const maxY = GameArea.clientHeight - target.clientHeight;

    const x = Math.max(0, Math.floor(Math.random() * maxX));
    const y = Math.max(0, Math.floor(Math.random() * maxY));

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    score();
}

async function counter(): Promise<void> {
    currentGameId++;
    const thisGameId = currentGameId;

    totalhits = 0;
    total = 0;
    isPlaying = false;
    score();

    const coun = document.getElementById("CountDown") as HTMLElement;
    const counterList: string[] = ["3", "2", "1", "Go"];

    const target = document.querySelector(".Target") as HTMLDivElement;
    target.style.display = "none";
    coun.style.display = "flex";

    for (const Count of counterList) {
        if (thisGameId !== currentGameId) return;
        coun.textContent = Count;
        await wait(1000);
    }

    if (thisGameId !== currentGameId) return;

    const title = document.querySelector(".main h1") as HTMLHeadingElement;
    if (title) title.style.display = "none";
    coun.style.display = "none";

    isPlaying = true;
    let time: number = 30;
    const tim = document.querySelector(".Timer") as HTMLDivElement;

    Game();

    // Timer loop
    while (time > 0) {
        if (thisGameId !== currentGameId) return;
        tim.textContent = `Time: ${time}`;
        time--;
        await wait(1000);
    }

    if (thisGameId !== currentGameId) return;

    // Game Finished
    isPlaying = false;
    tim.textContent = `Time: 0`;
    target.style.display = "none";

    coun.textContent = "Game Over";
    coun.style.display = "block";
}

function Start(): void {
    counter();
}

function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function score(): void {
    const Sc = document.getElementById("Score") as HTMLDivElement;
    Sc.innerHTML = "";

    const accuracy: number = total > 0 ? Math.round((totalhits / total) * 100) : 0;

    const Scor = document.createElement("div");
    const accu = document.createElement("div");
    const restart = document.createElement("div");

    restart.textContent = `Restart`;
    restart.style.cursor = "pointer";
    Scor.textContent = `Score: ${totalhits}/${total}`;
    accu.textContent = `Accuracy: ${accuracy}%`;

    Sc.appendChild(Scor);
    Sc.appendChild(restart);
    Sc.appendChild(accu);

    restart.onclick = () => counter();
}

async function AddScore(e?: MouseEvent): Promise<void> {
    if (!isPlaying) return;
    if (e) e.stopPropagation(); // Prevent clicking target from triggering miss on main area

    const target = document.querySelector(".Target") as HTMLDivElement;
    target.style.backgroundColor = "green";

    totalhits++;
    total++;
    score();

    await wait(120); // Quick green flash
    if (isPlaying) {
        Game();
    }
}

function MissClick(): void {
    if (!isPlaying) return;
    total++;
    score();
}
