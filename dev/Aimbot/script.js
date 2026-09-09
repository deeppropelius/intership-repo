"use strict";
let totalhits = 0;
let total = 0;
let isPlaying = false;
let currentGameId = 0;
function Game() {
    const GameArea = document.querySelector(".main");
    const target = document.querySelector(".Target");
    target.style.background = "radial-gradient(circle, #ff6b6b 0%, #ef4444 35%, #b91c1c 65%, #450a0a 100%)";
    target.style.display = "block";
    const maxX = GameArea.clientWidth - target.clientWidth;
    const maxY = GameArea.clientHeight - target.clientHeight;
    const x = Math.max(0, Math.floor(Math.random() * maxX));
    const y = Math.max(0, Math.floor(Math.random() * maxY));
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    score();
}
async function counter() {
    currentGameId++;
    const thisGameId = currentGameId;
    totalhits = 0;
    total = 0;
    isPlaying = false;
    score();
    const coun = document.getElementById("CountDown");
    const counterList = ["3", "2", "1", "Go"];
    const target = document.querySelector(".Target");
    target.style.display = "none";
    coun.style.display = "flex";
    for (const Count of counterList) {
        if (thisGameId !== currentGameId)
            return;
        coun.textContent = Count;
        await wait(1000);
    }
    if (thisGameId !== currentGameId)
        return;
    const title = document.querySelector(".main h1");
    if (title)
        title.style.display = "none";
    coun.style.display = "none";
    isPlaying = true;
    let time = 30;
    const tim = document.querySelector(".Timer");
    Game();
    // Timer loop
    while (time > 0) {
        if (thisGameId !== currentGameId)
            return;
        tim.textContent = `Time: ${time}`;
        time--;
        await wait(1000);
    }
    if (thisGameId !== currentGameId)
        return;
    // Game Finished
    isPlaying = false;
    tim.textContent = `Time: 0`;
    target.style.display = "none";
    coun.textContent = `Your Score: ${totalhits}/${total}`;
    coun.style.display = "block";
}
function Start() {
    counter();
}
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function score() {
    const Sc = document.getElementById("Score");
    Sc.innerHTML = "";
    const accuracy = total > 0 ? Math.round((totalhits / total) * 100) : 0;
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
async function AddScore(e) {
    if (!isPlaying)
        return;
    if (e)
        e.stopPropagation(); // Prevent clicking target from triggering miss on main area
    const target = document.querySelector(".Target");
    target.style.backgroundColor = "green";
    totalhits++;
    total++;
    score();
    await wait(120); // Quick green flash
    if (isPlaying) {
        Game();
    }
}
function MissClick() {
    if (!isPlaying)
        return;
    total++;
    score();
}
