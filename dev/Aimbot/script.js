"use strict";
function Game() {
    console.log("Started");
    score();
    const GameArea = document.querySelector(".main ");
    const target = document.querySelector(".Target");
    target.style.display = "block";
    const x = Math.random() * (GameArea.clientWidth - target.clientWidth);
    const y = Math.random() * (GameArea.clientHeight - target.clientHeight);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    console.log(x, y);
    console.log("Target");
}
async function counter() {
    const coun = document.getElementById("CountDown");
    const counter = ["3", "2", "1", "Go"];
    const target = document.querySelector(".Target");
    target.style.display = "none";
    for (const Count of counter) {
        coun.textContent = Count;
        await wait(1000);
    }
    const title = document.querySelector(".main h1");
    const countdown = document.getElementById("CountDown");
    title.style.display = "none";
    countdown.style.display = "none";
    let time = 30;
    const timer = setInterval(() => {
        time--;
        if (time == 0) {
            clearInterval(timer);
        }
    }, 1000);
    while (time > 0) {
        const tim = document.querySelector(".Timer");
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
function Start() {
    console.log("Game Started");
    const target = document.querySelector(".Target");
    counter();
}
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//div id=Score
let totalhits = 0;
let total = 0;
let accuracy = (totalhits / total) * 100;
function score() {
    console.log("Score is called");
    const Sc = document.getElementById("Score");
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
function AddScore() {
    const target = document.querySelector(".Target");
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
