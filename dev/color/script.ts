import { BoardSpace, Player, TaskCard } from "./types.js";
import { createBoardSpaces, chanceTasks, communityTasks } from "./data/Properties.js";

// Game State
let boardSpaces: BoardSpace[] = [];
let players: Player[] = [
    { id: 1, name: "Alex", money: 15000, color: "#2563eb", tokenEmoji: "🚗", position: 0, inJail: false, jailTurns: 0, properties: [] },
    { id: 2, name: "Priya", money: 15000, color: "#dc2626", tokenEmoji: "✈️", position: 0, inJail: false, jailTurns: 0, properties: [] },
    { id: 3, name: "Rohan", money: 15000, color: "#16a34a", tokenEmoji: "🚢", position: 0, inJail: false, jailTurns: 0, properties: [] },
    { id: 4, name: "Sara", money: 15000, color: "#d97706", tokenEmoji: "🚂", position: 0, inJail: false, jailTurns: 0, properties: [] }
];

let currentPlayerIndex = 0;
let isMoving = false;
let chanceDeck: TaskCard[] = [...chanceTasks];
let communityDeck: TaskCard[] = [...communityTasks];

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// DOM Elements
const gameBoardEl = document.getElementById("gameBoard") as HTMLElement;
const playerListEl = document.getElementById("playerList") as HTMLElement;
const logFeedEl = document.getElementById("logFeed") as HTMLElement;
const headerTurnTextEl = document.getElementById("headerTurnText") as HTMLElement;
const headerTurnDotEl = document.getElementById("headerTurnDot") as HTMLElement;
const centerTurnIndicatorEl = document.getElementById("centerTurnIndicator") as HTMLElement;
const centerStatusMsgEl = document.getElementById("centerStatusMsg") as HTMLElement;
const btnRollDiceEl = document.getElementById("btnRollDice") as HTMLButtonElement;
const btnBuyPropertyEl = document.getElementById("btnBuyProperty") as HTMLButtonElement;
const btnEndTurnEl = document.getElementById("btnEndTurn") as HTMLButtonElement;
const btnShuffleBoardEl = document.getElementById("btnShuffleBoard") as HTMLButtonElement;
const btnRestartGameEl = document.getElementById("btnRestartGame") as HTMLButtonElement;
const die1El = document.getElementById("die1") as HTMLElement;
const die2El = document.getElementById("die2") as HTMLElement;
const inspectorCardEl = document.getElementById("inspectorCard") as HTMLElement;

// Modals
const propertyModalEl = document.getElementById("propertyModal") as HTMLElement;
const modalCloseBtnEl = document.getElementById("modalCloseBtn") as HTMLElement;
const modalDismissBtnEl = document.getElementById("modalDismissBtn") as HTMLElement;
const modalBuyActionBtnEl = document.getElementById("modalBuyActionBtn") as HTMLButtonElement;
const modalHeaderBannerEl = document.getElementById("modalHeaderBanner") as HTMLElement;
const modalPropNameEl = document.getElementById("modalPropName") as HTMLElement;
const modalPropGroupEl = document.getElementById("modalPropGroup") as HTMLElement;
const modalPropImgEl = document.getElementById("modalPropImg") as HTMLImageElement;
const modalPropDescEl = document.getElementById("modalPropDesc") as HTMLElement;
const modalBuyPriceEl = document.getElementById("modalBuyPrice") as HTMLElement;
const modalRentBaseEl = document.getElementById("modalRentBase") as HTMLElement;
const modalRent1El = document.getElementById("modalRent1") as HTMLElement;
const modalRent2El = document.getElementById("modalRent2") as HTMLElement;
const modalRent3El = document.getElementById("modalRent3") as HTMLElement;
const modalRentHotelEl = document.getElementById("modalRentHotel") as HTMLElement;
const modalOwnerValEl = document.getElementById("modalOwnerVal") as HTMLElement;

const taskModalEl = document.getElementById("taskModal") as HTMLElement;
const taskModalBadgeEl = document.getElementById("taskModalBadge") as HTMLElement;
const taskModalTitleEl = document.getElementById("taskModalTitle") as HTMLElement;
const taskModalDescEl = document.getElementById("taskModalDesc") as HTMLElement;
const taskModalValueEl = document.getElementById("taskModalValue") as HTMLElement;
const taskModalDismissBtnEl = document.getElementById("taskModalDismissBtn") as HTMLButtonElement;

// Map space index (0-35) to 10x10 CSS Grid coordinates
function getGridPosition(index: number): { row: number; col: number; edge: string } {
    if (index === 0) return { row: 10, col: 1, edge: "corner" }; // Start (Bottom-Left)
    if (index >= 1 && index <= 8) return { row: 10 - index, col: 1, edge: "edge-left" }; // Left: 1 -> Row 9, ..., 8 -> Row 2
    if (index === 9) return { row: 1, col: 1, edge: "corner" }; // Resthouse (Top-Left)
    if (index >= 10 && index <= 17) return { row: 1, col: index - 8, edge: "edge-top" }; // Top: 10 -> Col 2, ..., 17 -> Col 9
    if (index === 18) return { row: 1, col: 10, edge: "corner" }; // Club (Top-Right)
    if (index >= 19 && index <= 26) return { row: index - 17, col: 10, edge: "edge-right" }; // Right: 19 -> Row 2, ..., 26 -> Row 9
    if (index === 27) return { row: 10, col: 10, edge: "corner" }; // Jail (Bottom-Right)
    if (index >= 28 && index <= 35) return { row: 10, col: 37 - index, edge: "edge-bottom" }; // Bottom: 28 -> Col 9, ..., 35 -> Col 2
    return { row: 1, col: 1, edge: "corner" };
}

// Render Board UI
function renderBoard(): void {
    // Remove existing space elements but keep the center hub
    const existingSpaces = gameBoardEl.querySelectorAll(".space");
    existingSpaces.forEach((el) => el.remove());

    boardSpaces.forEach((space) => {
        const { row, col, edge } = getGridPosition(space.spaceIndex);
        const spaceEl = document.createElement("div");
        spaceEl.className = `space ${edge} space-pos-${space.spaceIndex}`;
        spaceEl.id = `space-${space.spaceIndex}`;
        spaceEl.style.gridRow = `${row}`;
        spaceEl.style.gridColumn = `${col}`;

        if (space.type === "corner") {
            spaceEl.classList.add("corner-space");
            let icon = "🚩";
            if (space.name === "RESTHOUSE") icon = "🌴";
            if (space.name === "CLUB") icon = "🎉";
            if (space.name === "JAIL") icon = "🔒";

            spaceEl.innerHTML = `
                <div class="corner-icon">${icon}</div>
                <div class="corner-title">${space.name}</div>
                <div class="corner-desc">${space.subtitle || ""}</div>
                <div class="tile-tokens" id="tokens-${space.spaceIndex}"></div>
            `;
        } else if (space.type === "chance" || space.type === "community") {
            const isChance = space.type === "chance";
            spaceEl.classList.add(isChance ? "chance-space" : "community-space");
            const icon = isChance ? "❓" : "🎁";
            const colorClass = isChance ? "group-chance" : "group-community";

            spaceEl.innerHTML = `
                <div class="space-color-bar ${colorClass}"></div>
                <div class="space-body">
                    <div class="task-icon-pill">${icon}</div>
                    <div class="space-name">${space.name}</div>
                    <div class="space-price" style="background: transparent; font-size: 8px;">DRAW CARD</div>
                </div>
                <div class="tile-tokens" id="tokens-${space.spaceIndex}"></div>
            `;
        } else {
            // Standard Property or White Property
            const groupClass = `group-${space.group || "white"}`;
            const priceTag = space.buyingPrice ? `₹${space.buyingPrice.toLocaleString()}` : "";
            const imageSrc = space.image || "./assets/Darjeeling.jpg";

            spaceEl.innerHTML = `
                <div class="space-color-bar ${groupClass}"></div>
                <div class="space-body">
                    <img class="space-thumb" src="${imageSrc}" alt="${space.name}" onerror="this.src='./assets/Darjeeling.jpg'">
                    <div class="space-name">${space.name}</div>
                    <div class="space-price">${priceTag}</div>
                </div>
                <div class="tile-tokens" id="tokens-${space.spaceIndex}"></div>
            `;
        }

        // Add owner indicator if owned
        if (space.ownerId !== null && space.ownerId !== undefined) {
            const owner = players.find(p => p.id === space.ownerId);
            if (owner) {
                const ownerDot = document.createElement("div");
                ownerDot.className = "owner-indicator";
                ownerDot.style.background = owner.color;
                ownerDot.title = `Owned by ${owner.name}`;
                spaceEl.appendChild(ownerDot);
            }
        }

        // Click to view property info
        spaceEl.addEventListener("click", () => {
            inspectSpace(space);
        });

        gameBoardEl.appendChild(spaceEl);
    });

    updateTokensDisplay();
}

// Update Token Bubbles on Board
function updateTokensDisplay(): void {
    // Clear all token slots
    for (let i = 0; i < 36; i++) {
        const slot = document.getElementById(`tokens-${i}`);
        if (slot) slot.innerHTML = "";
    }

    players.forEach((player) => {
        const slot = document.getElementById(`tokens-${player.position}`);
        if (slot) {
            const bubble = document.createElement("div");
            bubble.className = "token-bubble";
            bubble.style.setProperty("--token-color", player.color);
            bubble.textContent = player.tokenEmoji;
            bubble.title = `${player.name} (₹${player.money.toLocaleString()})`;
            slot.appendChild(bubble);
        }
    });
}

// Render Players List
function renderPlayers(): void {
    playerListEl.innerHTML = "";
    players.forEach((player, idx) => {
        const isCurrent = idx === currentPlayerIndex;
        const card = document.createElement("div");
        card.className = `player-card ${isCurrent ? "active-turn" : ""}`;
        card.style.setProperty("--player-color", player.color);

        // Render owned property mini badges
        const badgesHtml = player.properties.map(pId => {
            const prop = boardSpaces.find(s => s.id === pId);
            const color = prop ? (prop.group === "red" ? "#e53935" : prop.group === "yellow" ? "#f59e0b" : prop.group === "blue" ? "#1e88e5" : prop.group === "green" ? "#2e7d32" : "#64748b") : "#94a3b8";
            return `<div class="prop-badge" style="background: ${color};" title="${prop?.name || ''}"></div>`;
        }).join("");

        card.innerHTML = `
            <div class="player-card-header">
                <div class="player-identity">
                    <div class="player-avatar" style="background: ${player.color}">${player.tokenEmoji}</div>
                    <div class="player-name">${player.name}</div>
                </div>
                <div class="player-money">₹${player.money.toLocaleString()}</div>
            </div>
            <div class="player-badges">
                ${badgesHtml || '<span style="font-size: 11px; color: #64748b;">No properties yet</span>'}
            </div>
        `;
        playerListEl.appendChild(card);
    });

    const activePlayer = players[currentPlayerIndex];
    headerTurnTextEl.textContent = `${activePlayer.name}'s Turn`;
    headerTurnDotEl.style.color = activePlayer.color;
    headerTurnDotEl.style.backgroundColor = activePlayer.color;
    centerTurnIndicatorEl.textContent = `${activePlayer.name}'s Turn`;
    centerTurnIndicatorEl.style.background = activePlayer.color;
}

// Add Log Entry
function addLog(message: string, type: "default" | "money-gain" | "money-loss" | "buy" | "card" = "default"): void {
    const item = document.createElement("div");
    item.className = `log-item ${type}`;
    item.innerHTML = message;
    logFeedEl.insertBefore(item, logFeedEl.firstChild);
}

// Render 3D Dice Pips
function renderDiePips(dieEl: HTMLElement, value: number): void {
    dieEl.innerHTML = "";
    const positions: Record<number, number[]> = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
    };

    const activePips = positions[value] || [4];
    for (let i = 0; i < 9; i++) {
        if (activePips.includes(i)) {
            const pip = document.createElement("div");
            pip.className = "die-pip";
            dieEl.appendChild(pip);
        } else {
            const empty = document.createElement("div");
            dieEl.appendChild(empty);
        }
    }
}

// Inspect Space Info
function inspectSpace(space: BoardSpace): void {
    inspectorCardEl.innerHTML = `
        <div style="font-weight: 800; color: #f8fafc; margin-bottom: 4px;">${space.name}</div>
        <div style="font-size: 12px; margin-bottom: 4px;">${space.subtitle || space.type.toUpperCase()}</div>
        ${space.buyingPrice ? `<div style="color: #10b981; font-weight: 700;">Price: ₹${space.buyingPrice.toLocaleString()}</div>` : ''}
        ${space.rent ? `<div style="font-size: 11px; margin-top: 4px;">Base Rent: ₹${space.rent.base.toLocaleString()}</div>` : ''}
        <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">${space.description || "Click to inspect details."}</div>
    `;

    if (space.type === "property" || space.type === "white") {
        openPropertyModal(space);
    }
}

// Open Property Details Modal
function openPropertyModal(space: BoardSpace): void {
    modalPropNameEl.textContent = space.name;
    const groupColors: Record<string, string> = {
        red: "#e53935",
        yellow: "#f59e0b",
        blue: "#1e88e5",
        green: "#2e7d32",
        white: "#475569"
    };
    const groupColor = groupColors[space.group || "white"] || "#334155";
    modalHeaderBannerEl.style.background = groupColor;
    modalPropGroupEl.textContent = `${(space.group || "Transport").toUpperCase()} GROUP`;
    modalPropImgEl.src = space.image || "./assets/Darjeeling.jpg";
    modalPropDescEl.textContent = space.description || "Scenic location in India.";
    modalBuyPriceEl.textContent = space.buyingPrice ? `₹${space.buyingPrice.toLocaleString()}` : "N/A";

    modalRentBaseEl.textContent = space.rent ? `₹${space.rent.base.toLocaleString()}` : "N/A";
    modalRent1El.textContent = space.rent ? `₹${space.rent.house1.toLocaleString()}` : "N/A";
    modalRent2El.textContent = space.rent ? `₹${space.rent.house2.toLocaleString()}` : "N/A";
    modalRent3El.textContent = space.rent ? `₹${space.rent.house3.toLocaleString()}` : "N/A";
    modalRentHotelEl.textContent = space.rent ? `₹${space.rent.hotel.toLocaleString()}` : "N/A";

    const owner = players.find(p => p.id === space.ownerId);
    modalOwnerValEl.textContent = owner ? owner.name : "Unowned";
    modalOwnerValEl.style.color = owner ? owner.color : "#10b981";

    const activePlayer = players[currentPlayerIndex];
    if (space.ownerId === null && activePlayer.position === space.spaceIndex && activePlayer.money >= (space.buyingPrice || 0)) {
        modalBuyActionBtnEl.style.display = "block";
        modalBuyActionBtnEl.onclick = () => {
            buyCurrentProperty();
            propertyModalEl.classList.remove("open");
        };
    } else {
        modalBuyActionBtnEl.style.display = "none";
    }

    propertyModalEl.classList.add("open");
}

modalCloseBtnEl.addEventListener("click", () => propertyModalEl.classList.remove("open"));
modalDismissBtnEl.addEventListener("click", () => propertyModalEl.classList.remove("open"));

// Roll Dice & Movement Logic
async function handleRollDice(): Promise<void> {
    if (isMoving) return;
    isMoving = true;
    btnRollDiceEl.disabled = true;
    btnBuyPropertyEl.style.display = "none";
    btnEndTurnEl.style.display = "none";

    die1El.classList.add("rolling");
    die2El.classList.add("rolling");
    centerStatusMsgEl.textContent = "Rolling dice...";

    await new Promise(res => setTimeout(res, 600));

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const totalRoll = d1 + d2;

    renderDiePips(die1El, d1);
    renderDiePips(die2El, d2);
    die1El.classList.remove("rolling");
    die2El.classList.remove("rolling");

    const player = players[currentPlayerIndex];
    addLog(`🎲 <strong>${player.name}</strong> rolled <strong>${d1} + ${d2} = ${totalRoll}</strong>!`);
    centerStatusMsgEl.textContent = `${player.name} moves ${totalRoll} spaces...`;

    // Step by step animation
    let currentPos = player.position;
    for (let step = 1; step <= totalRoll; step++) {
        currentPos = (currentPos + 1) % 36;
        player.position = currentPos;
        updateTokensDisplay();

        // Check if passed Start (Space 0)
        if (currentPos === 0 && step < totalRoll) {
            player.money += 2000;
            addLog(`🚩 <strong>${player.name}</strong> passed START and collected <strong>₹2,000</strong>!`, "money-gain");
            renderPlayers();
        }

        await new Promise(res => setTimeout(res, 140));
    }

    // Landed on destination
    const destinationSpace = boardSpaces[player.position];
    handleLandedSpace(destinationSpace);
}

// Handle Landed Space Rules
function handleLandedSpace(space: BoardSpace): void {
    const player = players[currentPlayerIndex];

    // Highlight landed space
    document.querySelectorAll(".space-highlight").forEach(el => el.classList.remove("space-highlight"));
    const spaceEl = document.getElementById(`space-${space.spaceIndex}`);
    if (spaceEl) spaceEl.classList.add("space-highlight");

    if (space.spaceIndex === 0) {
        player.money += 2000;
        addLog(`🚩 <strong>${player.name}</strong> landed on START! Collected <strong>₹2,000</strong> bonus salary.`, "money-gain");
        centerStatusMsgEl.textContent = `Landed on START! +₹2,000 collected.`;
        enableTurnEnd();
    } else if (space.type === "corner") {
        if (space.name === "JAIL") {
            addLog(`🔒 <strong>${player.name}</strong> is visiting JAIL.`);
            centerStatusMsgEl.textContent = "Just visiting the lockup!";
        } else if (space.name === "RESTHOUSE") {
            addLog(`🌴 <strong>${player.name}</strong> is relaxing at the luxury RESTHOUSE.`);
            centerStatusMsgEl.textContent = "Enjoying the peaceful resthouse.";
        } else if (space.name === "CLUB") {
            addLog(`🎉 <strong>${player.name}</strong> visited the exclusive VIP CLUB!`);
            centerStatusMsgEl.textContent = "Partying at the VIP Club!";
        }
        enableTurnEnd();
    } else if (space.type === "chance") {
        drawTaskCard("chance");
    } else if (space.type === "community") {
        drawTaskCard("community");
    } else if (space.type === "property" || space.type === "white") {
        if (space.ownerId === null || space.ownerId === undefined) {
            // Unowned Property
            centerStatusMsgEl.textContent = `${space.name} is available for ₹${(space.buyingPrice || 0).toLocaleString()}`;
            if (player.money >= (space.buyingPrice || 0)) {
                btnBuyPropertyEl.style.display = "inline-flex";
                btnBuyPropertyEl.textContent = `💰 Buy for ₹${(space.buyingPrice || 0).toLocaleString()}`;
            }
            enableTurnEnd();
        } else if (space.ownerId === player.id) {
            centerStatusMsgEl.textContent = `You own ${space.name}!`;
            addLog(`🏠 <strong>${player.name}</strong> visited their own property <strong>${space.name}</strong>.`);
            enableTurnEnd();
        } else {
            // Owned by opponent - Pay Rent!
            const owner = players.find(p => p.id === space.ownerId)!;
            const rentAmount = space.rent?.base || 100;
            player.money -= rentAmount;
            owner.money += rentAmount;
            addLog(`💸 <strong>${player.name}</strong> paid <strong>₹${rentAmount.toLocaleString()}</strong> rent to <strong>${owner.name}</strong> for ${space.name}.`, "money-loss");
            centerStatusMsgEl.textContent = `Paid ₹${rentAmount.toLocaleString()} rent to ${owner.name}.`;
            renderPlayers();
            enableTurnEnd();
        }
    }
}

// Draw Chance or Community Task Card
function drawTaskCard(type: "chance" | "community"): void {
    const isChance = type === "chance";
    let deck = isChance ? chanceDeck : communityDeck;
    if (deck.length === 0) {
        deck = isChance ? [...chanceTasks] : [...communityTasks];
    }
    const card = deck.shift()!;
    if (isChance) chanceDeck = deck;
    else communityDeck = deck;

    const player = players[currentPlayerIndex];

    taskModalBadgeEl.textContent = isChance ? "❓" : "🎁";
    taskModalTitleEl.textContent = card.title;
    taskModalDescEl.textContent = card.description;

    if (card.actionType === "money") {
        const isPos = card.value >= 0;
        taskModalValueEl.textContent = `${isPos ? "+" : "-"} ₹${Math.abs(card.value).toLocaleString()}`;
        taskModalValueEl.className = `task-modal-value ${isPos ? "positive" : "negative"}`;

        player.money += card.value;
        addLog(`🃏 <strong>${player.name}</strong> drew ${isChance ? "Chance" : "Community"}: "${card.title}" (${isPos ? "+" : "-"}₹${Math.abs(card.value)}).`, "card");
    } else if (card.actionType === "move") {
        taskModalValueEl.textContent = "ADVANCE TO START";
        taskModalValueEl.className = "task-modal-value positive";
        player.position = 0;
        player.money += 2000;
        updateTokensDisplay();
        addLog(`🚁 <strong>${player.name}</strong> flew straight to START and collected ₹2,000!`, "money-gain");
    }

    renderPlayers();
    taskModalEl.classList.add("open");

    taskModalDismissBtnEl.onclick = () => {
        taskModalEl.classList.remove("open");
        enableTurnEnd();
    };
}

// Buy Property Action
function buyCurrentProperty(): void {
    const player = players[currentPlayerIndex];
    const space = boardSpaces[player.position];

    if (!space || space.ownerId !== null || !space.buyingPrice) return;
    if (player.money < space.buyingPrice) {
        alert("Not enough money to purchase this property!");
        return;
    }

    player.money -= space.buyingPrice;
    space.ownerId = player.id;
    player.properties.push(space.id);

    addLog(`🎉 <strong>${player.name}</strong> bought <strong>${space.name}</strong> for <strong>₹${space.buyingPrice.toLocaleString()}</strong>!`, "buy");
    centerStatusMsgEl.textContent = `Purchased ${space.name}!`;

    btnBuyPropertyEl.style.display = "none";
    renderBoard();
    renderPlayers();
    inspectSpace(space);
}

// Enable End Turn button
function enableTurnEnd(): void {
    isMoving = false;
    btnEndTurnEl.style.display = "inline-flex";
}

// End Turn Handler
function handleEndTurn(): void {
    btnBuyPropertyEl.style.display = "none";
    btnEndTurnEl.style.display = "none";
    btnRollDiceEl.disabled = false;

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    renderPlayers();
    const nextPlayer = players[currentPlayerIndex];
    centerStatusMsgEl.textContent = `${nextPlayer.name}'s turn. Click "Roll Dice" to proceed.`;
}

// Shuffle Board (keeps corners fixed)
function handleShuffleBoard(): void {
    boardSpaces = createBoardSpaces(true);
    renderBoard();
    addLog(`🔀 The board properties were randomized! Corners remain fixed.`, "default");
}

// Restart Game
function handleRestartGame(): void {
    if (confirm("Start a brand new game? All positions and assets will be reset.")) {
        players = [
            { id: 1, name: "Alex", money: 15000, color: "#2563eb", tokenEmoji: "🚗", position: 0, inJail: false, jailTurns: 0, properties: [] },
            { id: 2, name: "Priya", money: 15000, color: "#dc2626", tokenEmoji: "✈️", position: 0, inJail: false, jailTurns: 0, properties: [] },
            { id: 3, name: "Rohan", money: 15000, color: "#16a34a", tokenEmoji: "🚢", position: 0, inJail: false, jailTurns: 0, properties: [] },
            { id: 4, name: "Sara", money: 15000, color: "#d97706", tokenEmoji: "🚂", position: 0, inJail: false, jailTurns: 0, properties: [] }
        ];
        currentPlayerIndex = 0;
        boardSpaces = createBoardSpaces(false);
        renderBoard();
        renderPlayers();
        renderDiePips(die1El, 1);
        renderDiePips(die2El, 2);
        logFeedEl.innerHTML = `<div class="log-item">🎮 Brand new game started! Have fun trading properties across India.</div>`;
        centerStatusMsgEl.textContent = "Click 'Roll Dice' to begin!";
    }
}

// Initialize Game
function initGame(): void {
    boardSpaces = createBoardSpaces(false);
    renderBoard();
    renderPlayers();
    renderDiePips(die1El, 3);
    renderDiePips(die2El, 4);

    btnRollDiceEl.addEventListener("click", handleRollDice);
    btnBuyPropertyEl.addEventListener("click", buyCurrentProperty);
    btnEndTurnEl.addEventListener("click", handleEndTurn);
    btnShuffleBoardEl.addEventListener("click", handleShuffleBoard);
    btnRestartGameEl.addEventListener("click", handleRestartGame);
}

// Start on DOM ready
document.addEventListener("DOMContentLoaded", initGame);