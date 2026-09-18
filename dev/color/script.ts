import { BoardSpace, Player, TaskCard, GameRules } from "./types.js";
import { createBoardSpaces, chanceTasks, communityTasks, gameConfig } from "./data/Properties.js";
import { ICONS, getTokenSvg } from "./icons.js";

// Game State
let boardSpaces: BoardSpace[] = [];
let players: Player[] = [
    { id: 1, name: "Alex", money: gameConfig.startingMoney, color: "#3b82f6", tokenEmoji: "pin", position: 0, inJail: false, jailTurns: 0, properties: [] },
    { id: 2, name: "Priya", money: gameConfig.startingMoney, color: "#ef4444", tokenEmoji: "pin", position: 0, inJail: false, jailTurns: 0, properties: [] },
    { id: 3, name: "Rohan", money: gameConfig.startingMoney, color: "#10b981", tokenEmoji: "pin", position: 0, inJail: false, jailTurns: 0, properties: [] },
    { id: 4, name: "Sara", money: gameConfig.startingMoney, color: "#f59e0b", tokenEmoji: "pin", position: 0, inJail: false, jailTurns: 0, properties: [] }
];

let currentPlayerIndex = 0;
let isMoving = false;
let isMatchStarted = false;
let chanceDeck: TaskCard[] = [];
let communityDeck: TaskCard[] = [];

// Available Colors
const defaultColors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#a855f7", "#ec4899", "#06b6d4", "#f97316"];

// DOM Elements
const gameBoardEl = document.getElementById("gameBoard") as HTMLElement;
const playerListEl = document.getElementById("playerList") as HTMLElement;
const logFeedEl = document.getElementById("logFeed") as HTMLElement;
const headerTurnTextEl = document.getElementById("headerTurnText") as HTMLElement | null;
const headerTurnDotEl = document.getElementById("headerTurnDot") as HTMLElement | null;
const centerTurnIndicatorEl = document.getElementById("centerTurnIndicator") as HTMLElement;
const centerStatusMsgEl = document.getElementById("centerStatusMsg") as HTMLElement;
const btnRollDiceEl = document.getElementById("btnRollDice") as HTMLButtonElement;
const btnBuyPropertyEl = document.getElementById("btnBuyProperty") as HTMLButtonElement;
const btnEndTurnEl = document.getElementById("btnEndTurn") as HTMLButtonElement;
const btnShuffleBoardEl = document.getElementById("btnShuffleBoard") as HTMLButtonElement;
const btnRestartGameEl = document.getElementById("btnRestartGame") as HTMLButtonElement;
const btnOpenSetupEl = document.getElementById("btnOpenSetup") as HTMLButtonElement;
const die1El = document.getElementById("die1") as HTMLElement;
const die2El = document.getElementById("die2") as HTMLElement;
const mobilePlayerStripEl = document.getElementById("mobilePlayerStrip") as HTMLElement;

// Player Setup Modal Elements
const setupModalEl = document.getElementById("setupModal") as HTMLElement;
const playerCountButtonsEl = document.getElementById("playerCountButtons") as HTMLElement;
const setupPlayerInputsEl = document.getElementById("setupPlayerInputs") as HTMLElement;
const btnSaveSetupEl = document.getElementById("btnSaveSetup") as HTMLButtonElement;
let setupCount = 4;

// Property Preview Modal Elements
const propertyModalEl = document.getElementById("propertyModal") as HTMLElement;
const modalCloseBtnEl = document.getElementById("modalCloseBtn") as HTMLElement;
const modalDismissBtnEl = document.getElementById("modalDismissBtn") as HTMLElement;
const modalHeaderBannerEl = document.getElementById("modalHeaderBanner") as HTMLElement;
const modalPropNameEl = document.getElementById("modalPropName") as HTMLElement;
const modalPropGroupEl = document.getElementById("modalPropGroup") as HTMLElement;
const modalPreviewCardEl = document.getElementById("modalPreviewCard") as HTMLElement;
const modalPreviewColorBarEl = document.getElementById("modalPreviewColorBar") as HTMLElement;
const modalUpgradeBadgeEl = document.getElementById("modalUpgradeBadge") as HTMLElement;
const modalGroupBonusBadgeEl = document.getElementById("modalGroupBonusBadge") as HTMLElement;
const modalPreviewRentEl = document.getElementById("modalPreviewRent") as HTMLElement;
const modalAuthorAvatarEl = document.getElementById("modalAuthorAvatar") as HTMLElement | null;
const modalAuthorNameEl = document.getElementById("modalAuthorName") as HTMLElement | null;
const modalAuthorRoleEl = document.getElementById("modalAuthorRole") as HTMLElement | null;
const modalPropDescEl = document.getElementById("modalPropDesc") as HTMLElement;
const modalBuyPriceEl = document.getElementById("modalBuyPrice") as HTMLElement;
const modalRentBaseEl = document.getElementById("modalRentBase") as HTMLElement;
const modalRent1El = document.getElementById("modalRent1") as HTMLElement;
const modalRent2El = document.getElementById("modalRent2") as HTMLElement;
const modalRent3El = document.getElementById("modalRent3") as HTMLElement;
const modalRentHotelEl = document.getElementById("modalRentHotel") as HTMLElement;
const rowRentBaseEl = document.getElementById("rowRentBase") as HTMLElement | null;
const rowRent1El = document.getElementById("rowRent1") as HTMLElement | null;
const rowRent2El = document.getElementById("rowRent2") as HTMLElement | null;
const rowRent3El = document.getElementById("rowRent3") as HTMLElement | null;
const rowRentHotelEl = document.getElementById("rowRentHotel") as HTMLElement | null;
const modalHouseCostEl = document.getElementById("modalHouseCost") as HTMLElement;
const modalSellValueEl = document.getElementById("modalSellValue") as HTMLElement;
const modalOwnerValEl = document.getElementById("modalOwnerVal") as HTMLElement;
const modalViewOnlyNoticeEl = document.getElementById("modalViewOnlyNotice") as HTMLElement;
const modalBuyActionBtnEl = document.getElementById("modalBuyActionBtn") as HTMLButtonElement;
const modalUpgradeActionBtnEl = document.getElementById("modalUpgradeActionBtn") as HTMLButtonElement;
const modalSellActionBtnEl = document.getElementById("modalSellActionBtn") as HTMLButtonElement;

// Task Modal Elements
const taskModalEl = document.getElementById("taskModal") as HTMLElement;
const taskModalCloseBtnEl = document.getElementById("taskModalCloseBtn") as HTMLElement;
const taskModalImgEl = document.getElementById("taskModalImg") as HTMLImageElement;
const taskModalTitleEl = document.getElementById("taskModalTitle") as HTMLElement;
const taskModalDescEl = document.getElementById("taskModalDesc") as HTMLElement;
const taskModalValueEl = document.getElementById("taskModalValue") as HTMLElement;
const taskModalDismissBtnEl = document.getElementById("taskModalDismissBtn") as HTMLButtonElement;

// Setup Modal Additional Close & Cancel Elements
const setupModalCloseBtnEl = document.getElementById("setupModalCloseBtn") as HTMLElement;
const btnCancelSetupEl = document.getElementById("btnCancelSetup") as HTMLElement;

// Game Over / Victory Modal Elements
const gameOverModalEl = document.getElementById("gameOverModal") as HTMLElement;
const winnerTitleEl = document.getElementById("winnerTitle") as HTMLElement;
const winnerSubtitleEl = document.getElementById("winnerSubtitle") as HTMLElement;
const leaderboardListEl = document.getElementById("leaderboardList") as HTMLElement;
const btnPlayAgainEl = document.getElementById("btnPlayAgain") as HTMLElement;

let currentDice: [number, number] = [3, 4];

// Shuffle Helper
function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

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

// Check if player owns 3 or more properties in the same color group (red, blue, green, yellow)
function ownsFullGroup(playerId: number | null | undefined, group?: string): boolean {
    if (!playerId || !group || group === "white" || group === "special") return false;
    const ownedCount = boardSpaces.filter(s => s.group === group && s.ownerId === playerId).length;
    return ownedCount >= 3;
}

// Calculate Current Rent with Group Bonus and Scaled Transport/White Rents
function getCurrentRent(space: BoardSpace): number {
    if (!space.rent) return 0;
    let base = space.rent.base;

    // Transport (White) Property scaling based on total white properties owned by this owner
    if (space.type === "white" && space.ownerId) {
        const whiteOwned = boardSpaces.filter(s => s.type === "white" && s.ownerId === space.ownerId).length;
        if (whiteOwned === 2) return base * 2;
        if (whiteOwned === 3) return base * 4;
        if (whiteOwned >= 4) return base * 8;
        return base;
    }

    if (space.hasHotel) base = space.rent.hotel;
    else if (space.houses === 3) base = space.rent.house3;
    else if (space.houses === 2) base = space.rent.house2;
    else if (space.houses === 1) base = space.rent.house1;

    if (gameConfig.completeGroupBonus && !space.houses && !space.hasHotel && ownsFullGroup(space.ownerId, space.group)) {
        return base * 2;
    }
    return base;
}

// Helper to format concise money strings for tight board tiles (e.g. 4000 -> 4k, 500 -> 500)
function formatShortMoney(val?: number): string {
    if (val === undefined || val === null) return "0";
    if (val >= 1000) {
        const k = val / 1000;
        return Number.isInteger(k) ? `${k}k` : `${k.toFixed(1)}k`;
    }
    return `${val}`;
}

// Render Board UI with Inward Rotation on Left & Right rows
function renderBoard(): void {
    const existingSpaces = gameBoardEl.querySelectorAll(".space");
    existingSpaces.forEach((el) => el.remove());

    boardSpaces.forEach((space) => {
        const { row, col, edge } = getGridPosition(space.spaceIndex);
        const spaceEl = document.createElement("div");
        spaceEl.className = `space ${edge} space-pos-${space.spaceIndex}`;
        spaceEl.id = `space-${space.spaceIndex}`;
        spaceEl.style.gridRow = `${row}`;
        spaceEl.style.gridColumn = `${col}`;

        const imageSrc = space.image || "./assets/Darjeeling.jpg";

        if (space.type === "corner") {
            spaceEl.classList.add("corner-space");
            spaceEl.innerHTML = `
                <div class="space-inner" style="background-image: url('${imageSrc}');">
                    <div class="corner-top-row">
                        <div id="user-count-${space.spaceIndex}"></div>
                    </div>
                    <div class="corner-body">
                        <div class="corner-title">${space.name}</div>
                        <div class="corner-desc">${space.subtitle || ""}</div>
                    </div>
                    <div class="tile-occupants" id="tokens-${space.spaceIndex}"></div>
                </div>
            `;
        } else if (space.type === "chance" || space.type === "community") {
            const isChance = space.type === "chance";
            spaceEl.classList.add(isChance ? "chance-space" : "community-space", "property-card");
            const colorClass = isChance ? "group-chance" : "group-community";

            spaceEl.innerHTML = `
                <div class="space-inner" style="background-image: url('${imageSrc}');">
                    <div class="space-color-bar ${colorClass}"></div>
                    <div class="card-top-row">
                        <div id="user-count-${space.spaceIndex}"></div>
                    </div>
                    <div class="card-bottom-content">
                        <div class="space-name">${space.name}</div>
                        <div class="space-price-tag unowned" style="background: rgba(0,0,0,0.85); color: #c084fc; font-size: clamp(5.2px, 0.72vw, 7.5px);">DRAW CARD</div>
                        <div class="tile-occupants" id="tokens-${space.spaceIndex}"></div>
                    </div>
                </div>
            `;
        } else {
            // Property or Transport Property
            const groupClass = `group-${space.group || "white"}`;
            spaceEl.classList.add("property-card");
            const curRent = getCurrentRent(space);
            const isOwned = space.ownerId !== null && space.ownerId !== undefined;

            // Owner Badge Check (Professional SVG Crown + Name)
            let ownerBadgeHtml = "";
            if (isOwned) {
                const owner = players.find(p => p.id === space.ownerId);
                if (owner) {
                    ownerBadgeHtml = `<div class="owner-badge-tag" style="--owner-color: ${owner.color}; background: ${owner.color};" title="Owned by ${owner.name}">${ICONS.crown} <span>${owner.name}</span></div>`;
                }
            }

            // House/Hotel Badge Check (Professional SVG House / Hotel)
            let houseBadgeHtml = "";
            if (space.hasHotel) {
                houseBadgeHtml = `<span class="card-house-indicator" style="background: #ef4444; color: #fff;">${ICONS.hotel} <span>Hotel</span></span>`;
            } else if (space.houses && space.houses > 0) {
                houseBadgeHtml = `<span class="card-house-indicator" style="background: #10b981; color: #fff;">${ICONS.house} <span>${space.houses > 1 ? space.houses : ''}</span></span>`;
            }

            const priceInfoHtml = isOwned
                ? `<div class="space-price-tag owned">Rent ₹${formatShortMoney(curRent)}</div>`
                : `<div class="space-price-tag unowned">
                     <span class="buy-val">₹${formatShortMoney(space.buyingPrice)}</span>
                     <span class="rent-val">R:₹${formatShortMoney(space.rent?.base)}</span>
                   </div>`;

            spaceEl.innerHTML = `
                <div class="space-inner" style="background-image: url('${imageSrc}');">
                    <div class="space-color-bar ${groupClass}"></div>
                    <div class="card-top-row">
                        <div id="user-count-${space.spaceIndex}"></div>
                        ${houseBadgeHtml}
                        ${ownerBadgeHtml}
                    </div>
                    <div class="card-bottom-content">
                        <div class="space-name">${space.name}</div>
                        ${priceInfoHtml}
                        <div class="tile-occupants" id="tokens-${space.spaceIndex}"></div>
                    </div>
                </div>
            `;
        }

        spaceEl.addEventListener("click", () => {
            inspectSpace(space);
        });

        gameBoardEl.appendChild(spaceEl);
    });

    updateTokensDisplay();
}

// Update Dynamic Occupants & High-Visibility Player Spotlight
function updateTokensDisplay(): void {
    for (let i = 0; i < 36; i++) {
        const slot = document.getElementById(`tokens-${i}`);
        if (slot) slot.innerHTML = "";

        const countSlot = document.getElementById(`user-count-${i}`);
        if (countSlot) countSlot.innerHTML = "";

        const spaceEl = document.getElementById(`space-${i}`);
        if (spaceEl) spaceEl.classList.remove("has-active-player");
    }

    const occupantsBySpace: Record<number, Player[]> = {};
    players.forEach((player) => {
        if (player.isBankrupt) return; // Skip eliminated bankrupt players from tile tokens
        if (!occupantsBySpace[player.position]) {
            occupantsBySpace[player.position] = [];
        }
        occupantsBySpace[player.position].push(player);
    });

    const activePlayer = players[currentPlayerIndex];

    Object.entries(occupantsBySpace).forEach(([spaceIdxStr, occupants]) => {
        const spaceIdx = parseInt(spaceIdxStr, 10);
        const slot = document.getElementById(`tokens-${spaceIdx}`);
        const countSlot = document.getElementById(`user-count-${spaceIdx}`);
        const spaceEl = document.getElementById(`space-${spaceIdx}`);

        // Prominent spotlight to the tile where active player is standing
        if (activePlayer && !activePlayer.isBankrupt && activePlayer.position === spaceIdx && spaceEl) {
            spaceEl.classList.add("has-active-player");
        }

        if (occupants.length > 0) {
            if (countSlot) {
                countSlot.innerHTML = `<span class="user-count-badge">${ICONS.user} <span>${occupants.length}</span></span>`;
            }

            if (slot) {
                occupants.forEach((player) => {
                    const pin = document.createElement("div");
                    pin.className = "player-board-pin";
                    pin.style.setProperty("--player-color", player.color);
                    pin.style.borderColor = player.color;
                    pin.innerHTML = getTokenSvg(player.tokenEmoji, 12);
                    pin.title = `${player.name} • Location: ${boardSpaces[spaceIdx]?.name || 'Board'}`;
                    slot.appendChild(pin);
                });
            }
        }
    });
}

// Calculate Net Worth of a player's assets
function calculatePlayerPropertyNetWorth(player: Player): number {
    return boardSpaces
        .filter(s => s.ownerId === player.id)
        .reduce((sum, s) => sum + (s.buyingPrice || 0) + (s.houses || 0) * (s.houseUpgrade || 0) + (s.hasHotel ? (s.houseUpgrade || 0) : 0), 0);
}

// Open Player Owned Properties Accordion Modal (Reference Expandable Cards Layout)
function openPlayerPortfolioModal(player: Player): void {
    const modalEl = document.getElementById("playerPortfolioModal");
    const avatarEl = document.getElementById("portfolioAvatar");
    const titleEl = document.getElementById("portfolioTitle");
    const subtitleEl = document.getElementById("portfolioSubtitle");
    const containerEl = document.getElementById("portfolioAccordionContainer");
    const closeBtnEl = document.getElementById("portfolioCloseBtn");
    if (!modalEl || !containerEl) return;

    if (closeBtnEl) {
        closeBtnEl.onclick = () => modalEl.classList.remove("open");
    }

    if (avatarEl) {
        avatarEl.style.backgroundColor = player.color;
        avatarEl.innerHTML = getTokenSvg(player.tokenEmoji, 18);
    }
    if (titleEl) {
        titleEl.textContent = `${player.name}'s Properties`;
    }
    if (subtitleEl) {
        const netWorth = player.money + calculatePlayerPropertyNetWorth(player);
        subtitleEl.innerHTML = `${player.properties.length} Asset${player.properties.length === 1 ? '' : 's'} Owned &bull; Total Value: ₹${netWorth.toLocaleString()}`;
    }

    containerEl.innerHTML = "";

    const ownedSpaces = boardSpaces.filter(s => s.ownerId === player.id);

    if (ownedSpaces.length === 0) {
        containerEl.innerHTML = `
            <div class="portfolio-empty-state">
                <div class="empty-icon">${ICONS.house}</div>
                <div class="empty-title">No Properties Owned Yet</div>
                <div class="empty-desc">${player.name} has not purchased any land or transport tickets yet. Roll the dice and acquire real estate to start collecting rent!</div>
            </div>
        `;
    } else {
        ownedSpaces.forEach((space, idx) => {
            const curRent = getCurrentRent(space);
            const isWhite = space.type === "white";
            const imageSrc = space.image || "./assets/Darjeeling.jpg";
            const groupColor = space.group === "red" ? "#ef4444" : space.group === "yellow" ? "#f59e0b" : space.group === "blue" ? "#3b82f6" : space.group === "green" ? "#10b981" : "#64748b";

            let levelLabel = "Base Land";
            if (isWhite) levelLabel = "Transport";
            else if (space.hasHotel) levelLabel = "Hotel (Max)";
            else if (space.houses) levelLabel = `${space.houses} House${space.houses > 1 ? 's' : ''}`;

            const cardEl = document.createElement("div");
            cardEl.className = `accordion-card ${idx === 0 ? 'active' : ''}`;
            cardEl.style.backgroundImage = `url('${imageSrc}')`;
            cardEl.style.setProperty("--card-group-color", groupColor);

            cardEl.innerHTML = `
                <div class="acc-overlay"></div>
                <div class="acc-tag" style="background: ${groupColor};">${(space.group || "Transport").toUpperCase()}</div>
                <div class="acc-content">
                    <div class="acc-title">${space.name}</div>
                    <div class="acc-meta">
                        <span>Rent: ₹${curRent.toLocaleString()} / turn</span>
                        <span>&bull;</span>
                        <span>${levelLabel}</span>
                    </div>
                    <button class="acc-inspect-btn">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        <span>Inspect &bull; Manage</span>
                    </button>
                </div>
            `;

            // Hover & Click interaction for accordion
            cardEl.addEventListener("click", (e) => {
                if ((e.target as HTMLElement).closest(".acc-inspect-btn")) {
                    modalEl.classList.remove("open");
                    inspectSpace(space);
                    return;
                }
                containerEl.querySelectorAll(".accordion-card").forEach(c => c.classList.remove("active"));
                cardEl.classList.add("active");
            });

            cardEl.addEventListener("mouseenter", () => {
                containerEl.querySelectorAll(".accordion-card").forEach(c => c.classList.remove("active"));
                cardEl.classList.add("active");
            });

            containerEl.appendChild(cardEl);
        });
    }

    modalEl.classList.add("open");
}

// Render Players List in Left Panel & Compact Mini User Bar for Small Screens
function renderPlayers(): void {
    playerListEl.innerHTML = "";
    if (mobilePlayerStripEl) mobilePlayerStripEl.innerHTML = "";

    players.forEach((player, idx) => {
        const isCurrent = idx === currentPlayerIndex && !player.isBankrupt;
        const currentSpace = boardSpaces[player.position];
        const badgesHtml = player.properties.map(pId => {
            const prop = boardSpaces.find(s => s.id === pId);
            const color = prop ? (prop.group === "red" ? "#ef4444" : prop.group === "yellow" ? "#f59e0b" : prop.group === "blue" ? "#3b82f6" : prop.group === "green" ? "#10b981" : "#94a3b8") : "#94a3b8";
            const levelContent = prop?.hasHotel ? ICONS.hotel : (prop?.houses ? `${ICONS.house} ${prop.houses}` : ICONS.pin);
            return `<div class="prop-badge" style="background: ${color};" title="${prop?.name || ''}">${levelContent}</div>`;
        }).join("");

        const moneyDisplay = player.isBankrupt ? `<span style="color: #ef4444; font-weight: 800; font-size: 0.82rem;">BANKRUPT</span>` : `₹${player.money.toLocaleString()}`;
        const locationDisplay = player.isBankrupt 
            ? `<span style="color: #ef4444; display: inline-flex; align-items: center; gap: 4px;">${ICONS.skull} <span>Eliminated</span></span>` 
            : `<span style="display: inline-flex; align-items: center; gap: 4px;">${ICONS.pin} <span>${currentSpace ? currentSpace.name : 'START'}</span></span>`;

        // 1. Sidebar Card (Desktop) with Board Tile Photo Background
        const card = document.createElement("div");
        card.className = `player-card ${isCurrent ? "active-turn" : ""} ${player.isBankrupt ? "bankrupt-card" : ""}`;
        card.style.setProperty("--player-color", player.color);
        const imageSrc = currentSpace?.image || "./assets/Darjeeling.jpg";
        card.style.backgroundImage = `url('${imageSrc}')`;
        card.title = `Click to view ${player.name}'s owned properties gallery`;
        card.innerHTML = `
            <div class="player-card-header">
                <div class="player-identity">
                    <div class="player-avatar" style="background: ${player.color}">${getTokenSvg(player.tokenEmoji, 16)}</div>
                    <div>
                        <div class="player-name">${player.name}</div>
                        <div class="player-location-info">${locationDisplay}</div>
                    </div>
                </div>
                <div class="player-money">${moneyDisplay}</div>
            </div>
            <div class="player-badges">
                ${badgesHtml || '<span style="font-size: 11px; color: #64748b;">No properties yet</span>'}
            </div>
        `;

        card.addEventListener("click", () => {
            openPlayerPortfolioModal(player);
        });

        playerListEl.appendChild(card);

        // 2. Sleek Mini Player Chip (Small Screens)
        if (mobilePlayerStripEl) {
            const chip = document.createElement("div");
            chip.className = `mini-player-chip ${isCurrent ? "active-turn" : ""} ${player.isBankrupt ? "bankrupt" : ""}`;
            chip.style.setProperty("--player-color", player.color);
            chip.title = `${player.name} • ₹${player.money.toLocaleString()} • ${player.properties.length} Properties`;

            const miniMoneyStr = player.isBankrupt ? "OUT" : `₹${player.money >= 1000 ? (player.money / 1000).toFixed(player.money % 1000 === 0 ? 0 : 1) + 'k' : player.money}`;
            const propCount = player.properties.length;

            chip.innerHTML = `
                <div class="mini-avatar" style="background: ${player.color}">${getTokenSvg(player.tokenEmoji, 13)}</div>
                <div class="mini-info">
                    <span class="mini-name">${player.name}</span>
                    <span class="mini-sep"></span>
                    <span class="mini-money" style="color: ${player.isBankrupt ? '#f87171' : '#4ade80'}">${miniMoneyStr}</span>
                    ${propCount > 0 ? `<span class="mini-sep"></span><span style="font-size:8.5px;font-weight:800;color:#7d98b8;">${propCount}P</span>` : ""}
                </div>
                ${isCurrent ? '<span class="mini-turn-tag">TURN</span>' : ''}
            `;

            chip.addEventListener("click", () => {
                openPlayerPortfolioModal(player);
            });

            mobilePlayerStripEl.appendChild(chip);
        }
    });

    const activePlayer = players[currentPlayerIndex];
    if (activePlayer) {
        if (headerTurnTextEl) headerTurnTextEl.textContent = `${activePlayer.name}'s Turn`;
        if (headerTurnDotEl) {
            headerTurnDotEl.style.color = activePlayer.color;
            headerTurnDotEl.style.backgroundColor = activePlayer.color;
        }
        centerTurnIndicatorEl.textContent = `${activePlayer.name}'s Turn`;
        const dockTurnDotEl = document.getElementById("dockTurnDot");
        if (dockTurnDotEl) dockTurnDotEl.style.backgroundColor = activePlayer.color;
    }

    // Hide or Show Shuffle Button based on whether the match has started
    if (isMatchStarted) {
        btnShuffleBoardEl.classList.add("hidden");
    } else {
        btnShuffleBoardEl.classList.remove("hidden");
    }
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

// Inspect Space Info & Open Interactive Preview
function inspectSpace(space: BoardSpace): void {
    if (space.type === "property" || space.type === "white") {
        openPropertyPreviewModal(space);
    }
}

// Open Interactive Property Buy, Sell & Upgrade Preview Modal
function openPropertyPreviewModal(space: BoardSpace): void {
    modalPropNameEl.textContent = space.name;
    const isWhite = space.type === "white";
    const groupColors: Record<string, string> = {
        red: "#ef4444",
        yellow: "#f59e0b",
        blue: "#3b82f6",
        green: "#10b981",
        white: "#ffffff"
    };
    const groupColor = groupColors[space.group || "white"] || "#3b82f6";
    // Apply group colour to hero card border + colorbar
    const heroEl = document.getElementById("modalPreviewCard");
    if (heroEl) heroEl.style.borderColor = groupColor;
    const colorBarEl = document.getElementById("modalPreviewColorBar");
    if (colorBarEl) colorBarEl.style.background = groupColor;
    const groupEl = document.getElementById("modalPropGroup");
    if (groupEl) {
        groupEl.textContent = `${(space.group || "Property").toUpperCase()} COLOR GROUP`;
        groupEl.style.color = groupColor;
    }
    
    // Hero background image
    const imageSrc = space.image || "./assets/Darjeeling.jpg";
    if (heroEl) heroEl.style.backgroundImage = `url('${imageSrc}')`;
    
    const curRent = getCurrentRent(space);
    const hasGroup = ownsFullGroup(space.ownerId, space.group);
    const whiteOwned = space.ownerId ? boardSpaces.filter(s => s.type === "white" && s.ownerId === space.ownerId).length : 0;

    if (isWhite) {
        modalUpgradeBadgeEl.textContent = "TRANSPORT NETWORK";
        modalUpgradeBadgeEl.style.background = "#6366f1";
        modalGroupBonusBadgeEl.innerHTML = whiteOwned >= 2
            ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${ICONS.star} <span>${whiteOwned === 2 ? '2x' : whiteOwned === 3 ? '4x' : '8x'} NETWORK MULTIPLIER ACTIVE</span></span>`
            : "";
        modalPreviewRentEl.textContent = `Rent: ₹${curRent.toLocaleString()} / turn • Value: ₹${(space.buyingPrice || 0).toLocaleString()} ${whiteOwned >= 2 ? `(${whiteOwned === 2 ? '2x' : whiteOwned === 3 ? '4x' : '8x'} Multiplier)` : ''}`;

        // Configure Pricing Rows for Transport Scaling
        if (rowRentBaseEl) {
            rowRentBaseEl.className = `pricing-row ${whiteOwned <= 1 ? 'active-level' : ''}`;
            rowRentBaseEl.innerHTML = `<span class="pricing-label-flex">1 Ticket (1x)</span><span class="price-val" id="modalRentBase">₹${(space.rent?.base || 0).toLocaleString()}</span>`;
        }
        if (rowRent1El) {
            rowRent1El.className = `pricing-row ${whiteOwned === 2 ? 'active-level' : ''}`;
            rowRent1El.innerHTML = `<span class="pricing-label-flex">2 Tickets (2x)</span><span class="price-val" id="modalRent1">₹${((space.rent?.base || 0) * 2).toLocaleString()}</span>`;
        }
        if (rowRent2El) {
            rowRent2El.className = `pricing-row ${whiteOwned === 3 ? 'active-level' : ''}`;
            rowRent2El.innerHTML = `<span class="pricing-label-flex">3 Tickets (4x)</span><span class="price-val" id="modalRent2">₹${((space.rent?.base || 0) * 4).toLocaleString()}</span>`;
        }
        if (rowRent3El) {
            rowRent3El.className = `pricing-row ${whiteOwned >= 4 ? 'active-level' : ''}`;
            rowRent3El.innerHTML = `<span class="pricing-label-flex">4+ Tickets (8x)</span><span class="price-val" id="modalRent3">₹${((space.rent?.base || 0) * 8).toLocaleString()}</span>`;
        }
        if (rowRentHotelEl) rowRentHotelEl.style.display = "none";
        const rowHouseCostEl = document.getElementById("rowHouseCost");
        if (rowHouseCostEl) rowHouseCostEl.style.display = "none";
    } else {
        // Upgrade Badge for Colored Properties
        let upgradeLevelText = "BASE LAND";
        if (space.hasHotel) upgradeLevelText = "LEVEL 4 (HOTEL)";
        else if (space.houses === 3) upgradeLevelText = "LEVEL 3 (3 HOUSES)";
        else if (space.houses === 2) upgradeLevelText = "LEVEL 2 (2 HOUSES)";
        else if (space.houses === 1) upgradeLevelText = "LEVEL 1 (1 HOUSE)";
        modalUpgradeBadgeEl.textContent = upgradeLevelText;
        modalUpgradeBadgeEl.style.background = space.hasHotel ? "#ef4444" : (space.houses ? "#10b981" : "#3b82f6");

        const colorOwnedCount = space.ownerId && space.group ? boardSpaces.filter(s => s.group === space.group && s.ownerId === space.ownerId).length : 0;
        modalGroupBonusBadgeEl.innerHTML = hasGroup ? `<span style="display: inline-flex; align-items: center; gap: 4px;">${ICONS.star} <span>${colorOwnedCount}/3+ COLOR SET OWNED (2x RENT ACTIVE)</span></span>` : "";
        modalPreviewRentEl.textContent = `Rent: ₹${curRent.toLocaleString()} / turn • Value: ₹${(space.buyingPrice || 0).toLocaleString()} ${hasGroup && !space.houses ? `(2x Set Bonus: ${colorOwnedCount} Owned)` : ''}`;

        // Restore Normal Property Pricing Rows
        const isBaseActive = !space.houses && !space.hasHotel;
        if (rowRentBaseEl) {
            rowRentBaseEl.className = `pricing-row ${isBaseActive ? 'active-level' : ''}`;
            rowRentBaseEl.innerHTML = `<span class="pricing-label-flex">Base Rent</span><span class="price-val" id="modalRentBase">₹${(space.rent?.base || 0).toLocaleString()}</span>`;
        }
        if (rowRent1El) {
            rowRent1El.className = `pricing-row ${space.houses === 1 ? 'active-level' : ''}`;
            rowRent1El.innerHTML = `<span class="pricing-label-flex">With 1 House</span><span class="price-val" id="modalRent1">₹${(space.rent?.house1 || 0).toLocaleString()}</span>`;
        }
        if (rowRent2El) {
            rowRent2El.className = `pricing-row ${space.houses === 2 ? 'active-level' : ''}`;
            rowRent2El.innerHTML = `<span class="pricing-label-flex">With 2 Houses</span><span class="price-val" id="modalRent2">₹${(space.rent?.house2 || 0).toLocaleString()}</span>`;
        }
        if (rowRent3El) {
            rowRent3El.className = `pricing-row ${space.houses === 3 ? 'active-level' : ''}`;
            rowRent3El.innerHTML = `<span class="pricing-label-flex">With 3 Houses</span><span class="price-val" id="modalRent3">₹${(space.rent?.house3 || 0).toLocaleString()}</span>`;
        }
        if (rowRentHotelEl) {
            rowRentHotelEl.style.display = "flex";
            rowRentHotelEl.className = `pricing-row ${space.hasHotel ? 'active-level' : ''}`;
            rowRentHotelEl.innerHTML = `<span class="pricing-label-flex">With Hotel</span><span class="price-val" id="modalRentHotel" style="color: #f59e0b;">₹${(space.rent?.hotel || 0).toLocaleString()}</span>`;
        }
        const rowHouseCostEl = document.getElementById("rowHouseCost");
        if (rowHouseCostEl) rowHouseCostEl.style.display = "flex";
        if (modalHouseCostEl) {
            modalHouseCostEl.textContent = space.houseUpgrade ? `₹${space.houseUpgrade.toLocaleString()}` : "N/A";
        }
    }

    modalPropDescEl.textContent = space.description || (isWhite ? "Transport ticket. Owning multiple white tickets multiplies the rent (1x -> 2x -> 4x -> 8x)." : "Prime location in India.");
    if (modalBuyPriceEl) modalBuyPriceEl.textContent = space.buyingPrice ? `₹${space.buyingPrice.toLocaleString()}` : "N/A";
    
    const sellRefund = calculatePropertyRefund(space);
    if (modalSellValueEl) modalSellValueEl.textContent = `₹${sellRefund.toLocaleString()}`;

    const owner = players.find(p => p.id === space.ownerId);
    modalOwnerValEl.textContent = owner ? owner.name : "Unowned";
    modalOwnerValEl.style.color = owner ? owner.color : "#10b981";

    // Populate Author / Owner Row inside reference card hero
    if (modalAuthorAvatarEl) {
        if (owner) {
            modalAuthorAvatarEl.style.borderColor = owner.color;
            modalAuthorAvatarEl.style.color = owner.color;
            modalAuthorAvatarEl.style.background = `${owner.color}28`;
        } else {
            modalAuthorAvatarEl.style.borderColor = "#f59e0b";
            modalAuthorAvatarEl.style.color = "#f59e0b";
            modalAuthorAvatarEl.style.background = "rgba(245, 158, 11, 0.15)";
        }
    }
    if (modalAuthorNameEl) {
        modalAuthorNameEl.textContent = owner ? owner.name : "Unowned Asset";
    }
    if (modalAuthorRoleEl) {
        if (owner) {
            modalAuthorRoleEl.textContent = `Monopoly Owner • ${owner.properties.length} Assets Held`;
        } else {
            modalAuthorRoleEl.textContent = space.buyingPrice ? `Available to Buy for ₹${space.buyingPrice.toLocaleString()}` : "Special Board Space";
        }
    }

    const activePlayer = players[currentPlayerIndex];
    const isLandedOnSpace = isMatchStarted && (activePlayer.position === space.spaceIndex);

    // Reset button & notice states
    modalViewOnlyNoticeEl.style.display = "none";
    modalBuyActionBtnEl.style.display = "none";
    modalUpgradeActionBtnEl.style.display = "none";
    modalSellActionBtnEl.style.display = "none";

    if (!isLandedOnSpace) {
        // PLAYER IS NOT LANDED ON THIS PROPERTY -> STRICT VIEW-ONLY MODE
        modalViewOnlyNoticeEl.style.display = "flex";
        if (space.ownerId === null || space.ownerId === undefined) {
            modalViewOnlyNoticeEl.innerHTML = `${ICONS.eye} <span><strong>Viewing Property</strong> &bull; Land on ${space.name} during your turn to purchase</span>`;
        } else if (space.ownerId === activePlayer.id) {
            modalViewOnlyNoticeEl.innerHTML = isWhite
                ? `${ICONS.house} <span><strong>Your Transport Ticket</strong> &bull; Acquire more white tickets to double your rent!</span>`
                : `${ICONS.house} <span><strong>Your Property</strong> &bull; Land on ${space.name} during your turn to upgrade houses/hotel</span>`;
        } else {
            const propOwner = players.find(p => p.id === space.ownerId);
            modalViewOnlyNoticeEl.innerHTML = `${ICONS.crown} <span>Owned by <strong>${propOwner ? propOwner.name : 'Another Player'}</strong> (Rent: ₹${curRent.toLocaleString()})</span>`;
        }
    } else {
        // PLAYER IS CURRENTLY LANDED ON THIS PROPERTY -> CAN BUY OR UPGRADE!
        // 1. Buy Action
        if (space.ownerId === null || space.ownerId === undefined) {
            modalBuyActionBtnEl.style.display = "flex";
            if (activePlayer.money >= (space.buyingPrice || 0)) {
                modalBuyActionBtnEl.disabled = false;
                modalBuyActionBtnEl.innerHTML = `${ICONS.buy} <span>Buy Property for ₹${(space.buyingPrice || 0).toLocaleString()}</span>`;
                modalBuyActionBtnEl.onclick = () => {
                    buyProperty(space);
                    openPropertyPreviewModal(space);
                };
            } else {
                modalBuyActionBtnEl.disabled = true;
                const needed = (space.buyingPrice || 0) - activePlayer.money;
                modalBuyActionBtnEl.innerHTML = `${ICONS.buy} <span>Insufficient Funds (Need +₹${needed.toLocaleString()})</span>`;
            }
        }

        // 2. Upgrade House / Hotel Action (Only for non-white properties with house upgrades)
        if (space.ownerId === activePlayer.id && !isWhite) {
            if (!space.hasHotel && space.houseUpgrade) {
                const isUpgradingHotel = (space.houses || 0) === 3;
                const upgradeCost = isUpgradingHotel ? (space.hotelUpgrade || space.houseUpgrade * 2) : space.houseUpgrade;
                const nextLevelName = isUpgradingHotel ? "Luxury Hotel" : `House ${(space.houses || 0) + 1}`;

                modalUpgradeActionBtnEl.style.display = "flex";
                modalUpgradeActionBtnEl.innerHTML = `${isUpgradingHotel ? ICONS.hotel : ICONS.house} <span>Upgrade to ${nextLevelName} (Cost: ₹${upgradeCost.toLocaleString()})</span>`;
                modalUpgradeActionBtnEl.disabled = activePlayer.money < upgradeCost;

                modalUpgradeActionBtnEl.onclick = () => {
                    upgradeProperty(space);
                    openPropertyPreviewModal(space);
                };
            }
        }

        // 3. Sell / Mortgage Action (For both colored and white properties)
        if (space.ownerId === activePlayer.id) {
            modalSellActionBtnEl.style.display = "flex";
            modalSellActionBtnEl.innerHTML = `${ICONS.tag} <span>Sell Property (Refund +₹${sellRefund.toLocaleString()})</span>`;
            modalSellActionBtnEl.onclick = () => {
                sellProperty(space);
                openPropertyPreviewModal(space);
            };
        }
    }

    propertyModalEl.classList.add("open");
}

modalCloseBtnEl.addEventListener("click", () => propertyModalEl.classList.remove("open"));
modalDismissBtnEl.addEventListener("click", () => propertyModalEl.classList.remove("open"));

// Calculate Equity Refund for a property (75% Land + 75% Buildings)
function calculatePropertyRefund(space: BoardSpace): number {
    let buildingEquity = 0;
    if (space.hasHotel) {
        buildingEquity = ((space.houseUpgrade || 500) * 3 + (space.hotelUpgrade || 1000));
    } else if (space.houses) {
        buildingEquity = (space.houseUpgrade || 500) * space.houses;
    }
    const landEquity = space.buyingPrice || 1000;
    return Math.floor((landEquity + buildingEquity) * 0.75);
}

// Buy Property Handler
function buyProperty(space: BoardSpace): void {
    const player = players[currentPlayerIndex];
    if (!space || space.ownerId !== null || !space.buyingPrice) return;
    if (player.position !== space.spaceIndex) {
        alert("You can only purchase a property when you land on it!");
        return;
    }
    if (player.money < space.buyingPrice) {
        alert("Not enough cash to purchase!");
        return;
    }

    player.money -= space.buyingPrice;
    space.ownerId = player.id;
    space.houses = 0;
    space.hasHotel = false;
    player.properties.push(space.id);

    addLog(`<strong>${player.name}</strong> bought <strong>${space.name}</strong> for <strong>₹${space.buyingPrice.toLocaleString()}</strong>!`, "buy");
    centerStatusMsgEl.textContent = `${player.name} bought ${space.name}!`;

    const colorCount = space.group ? boardSpaces.filter(s => s.group === space.group && s.ownerId === player.id).length : 0;
    if (colorCount >= 3) {
        addLog(`<strong>${player.name}</strong> owns ${colorCount} <strong>${(space.group || '').toUpperCase()}</strong> tickets! Rent is now DOUBLED (2x)!`, "money-gain");
    }

    btnBuyPropertyEl.style.display = "none";
    renderBoard();
    renderPlayers();
    saveGameState();
}

// Upgrade House / Hotel Handler
function upgradeProperty(space: BoardSpace): void {
    const player = players[currentPlayerIndex];
    if (!space || space.ownerId !== player.id) return;
    if (player.position !== space.spaceIndex) {
        alert("You can only upgrade a property when you land on it!");
        return;
    }

    const isUpgradingHotel = (space.houses || 0) === 3;
    const upgradeCost = isUpgradingHotel ? (space.hotelUpgrade || (space.houseUpgrade || 500) * 2) : (space.houseUpgrade || 500);

    if (player.money < upgradeCost) {
        alert("Not enough cash to upgrade!");
        return;
    }

    player.money -= upgradeCost;
    if (isUpgradingHotel) {
        space.hasHotel = true;
        addLog(`<strong>${player.name}</strong> built a <strong>LUXURY HOTEL</strong> on <strong>${space.name}</strong>! Rent is now ₹${(space.rent?.hotel || 0).toLocaleString()}.`, "buy");
    } else {
        space.houses = (space.houses || 0) + 1;
        const newRent = getCurrentRent(space);
        addLog(`<strong>${player.name}</strong> upgraded <strong>${space.name}</strong> to House ${space.houses}! Rent is now ₹${newRent.toLocaleString()}.`, "buy");
    }

    renderBoard();
    renderPlayers();
    saveGameState();
}

// Sell / Mortgage Property Handler
function sellProperty(space: BoardSpace): void {
    const player = players[currentPlayerIndex];
    if (!space || space.ownerId !== player.id) return;

    const refund = calculatePropertyRefund(space);
    player.money += refund;
    player.properties = player.properties.filter(id => id !== space.id);
    space.ownerId = null;
    space.houses = 0;
    space.hasHotel = false;

    addLog(`<strong>${player.name}</strong> sold <strong>${space.name}</strong> and received <strong>+₹${refund.toLocaleString()}</strong> refund (75% equity).`, "money-gain");
    centerStatusMsgEl.textContent = `Sold ${space.name}!`;

    renderBoard();
    renderPlayers();
    saveGameState();
}

// Roll Dice & Step-by-Step Movement
async function handleRollDice(): Promise<void> {
    if (isMoving) return;
    isMoving = true;

    // Mark match as started on first dice roll (locks shuffle)
    if (!isMatchStarted) {
        isMatchStarted = true;
        btnShuffleBoardEl.classList.add("hidden");
    }

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
    currentDice = [d1, d2];

    renderDiePips(die1El, d1);
    renderDiePips(die2El, d2);
    die1El.classList.remove("rolling");
    die2El.classList.remove("rolling");

    const player = players[currentPlayerIndex];
    addLog(`<strong>${player.name}</strong> rolled <strong>${d1} + ${d2} = ${totalRoll}</strong>!`);
    centerStatusMsgEl.textContent = `${player.name} moves ${totalRoll} spaces...`;

    let currentPos = player.position;
    for (let step = 1; step <= totalRoll; step++) {
        currentPos = (currentPos + 1) % 36;
        player.position = currentPos;
        updateTokensDisplay();

        // Passing START rule (Rule 11)
        if (currentPos === 0 && step < totalRoll) {
            player.money += gameConfig.startReward;
            addLog(`<strong>${player.name}</strong> passed START and collected <strong>₹${gameConfig.startReward.toLocaleString()}</strong> salary!`, "money-gain");
            renderPlayers();
        }

        await new Promise(res => setTimeout(res, 140));
    }

    const destinationSpace = boardSpaces[player.position];
    handleLandedSpace(destinationSpace);
}

// Debt & Bankruptcy Resolution System (Rules 30 & 31)
function resolveDebtAndPay(debtor: Player, creditor: Player | null, amount: number, reason: string): boolean {
    if (debtor.money >= amount) {
        debtor.money -= amount;
        if (creditor) creditor.money += amount;
        return true;
    }

    // Cash is insufficient! Calculate total net worth
    const debtorProperties = boardSpaces.filter(s => s.ownerId === debtor.id);
    const totalLiquidationValue = debtorProperties.reduce((sum, p) => sum + calculatePropertyRefund(p), 0);
    const totalNetWorth = debtor.money + totalLiquidationValue;

    if (totalNetWorth < amount) {
        // Bankruptcy!
        addLog(`<strong>${debtor.name}</strong> owes ₹${amount.toLocaleString()} ${reason} but only has net worth ₹${totalNetWorth.toLocaleString()}!`, "money-loss");
        handleBankruptcy(debtor, creditor);
        return false;
    }

    // Has enough net worth! Liquidate properties until debtor has enough cash
    let needed = amount - debtor.money;
    for (const prop of debtorProperties) {
        if (needed <= 0) break;
        const refund = calculatePropertyRefund(prop);
        debtor.money += refund;
        needed -= refund;
        debtor.properties = debtor.properties.filter(id => id !== prop.id);
        prop.ownerId = null;
        prop.houses = 0;
        prop.hasHotel = false;
        addLog(`<strong>${debtor.name}</strong> liquidated <strong>${prop.name}</strong> (+₹${refund.toLocaleString()}) to pay debt.`, "money-gain");
    }

    debtor.money -= amount;
    if (creditor) creditor.money += amount;
    renderBoard();
    renderPlayers();
    saveGameState();
    return true;
}

function handleBankruptcy(bankruptPlayer: Player, creditor: Player | null): void {
    bankruptPlayer.isBankrupt = true;
    const remainingCash = Math.max(0, bankruptPlayer.money);
    bankruptPlayer.money = 0;

    const ownedSpaces = boardSpaces.filter(s => s.ownerId === bankruptPlayer.id);

    if (creditor) {
        creditor.money += remainingCash;
        ownedSpaces.forEach(s => {
            s.ownerId = creditor.id;
            s.houses = 0;
            s.hasHotel = false;
            creditor.properties.push(s.id);
        });
        addLog(`<strong>${bankruptPlayer.name}</strong> has declared <strong>BANKRUPTCY</strong>! Assets transferred to <strong>${creditor.name}</strong>!`, "money-loss");
    } else {
        ownedSpaces.forEach(s => {
            s.ownerId = null;
            s.houses = 0;
            s.hasHotel = false;
        });
        addLog(`<strong>${bankruptPlayer.name}</strong> has declared <strong>BANKRUPTCY</strong>! Properties returned to bank.`, "money-loss");
    }

    bankruptPlayer.properties = [];
    renderBoard();
    renderPlayers();
    saveGameState();

    checkGameEnd();
}

function calculatePlayerTotalWealth(p: Player): number {
    if (p.isBankrupt) return 0;
    const owned = boardSpaces.filter(s => s.ownerId === p.id);
    const propValues = owned.reduce((sum, s) => {
        let val = s.buyingPrice || 0;
        if (s.hasHotel) {
            val += (s.houseUpgrade || 500) * 3 + (s.hotelUpgrade || 1000);
        } else if (s.houses) {
            val += (s.houseUpgrade || 500) * s.houses;
        }
        return sum + val;
    }, 0);
    return p.money + propValues;
}

function checkGameEnd(): void {
    const activePlayers = players.filter(p => !p.isBankrupt);
    if (activePlayers.length <= 1 && players.length > 1 && isMatchStarted) {
        const winner = activePlayers[0] || players[0];
        showGameOver(winner);
    }
}

function showGameOver(winner: Player): void {
    winnerTitleEl.textContent = `${winner.name} Wins!`;
    winnerSubtitleEl.textContent = `All competitors eliminated. ${winner.name} is the Supreme Business Tycoon!`;

    const standings = [...players].sort((a, b) => {
        if (a.isBankrupt && !b.isBankrupt) return 1;
        if (!a.isBankrupt && b.isBankrupt) return -1;
        return calculatePlayerTotalWealth(b) - calculatePlayerTotalWealth(a);
    });

    leaderboardListEl.innerHTML = standings.map((p, idx) => {
        const wealth = calculatePlayerTotalWealth(p);
        const rank = idx + 1;
        const bankruptTag = p.isBankrupt ? `<span class="leaderboard-status-bankrupt">BANKRUPT</span>` : "";
        return `
            <div class="leaderboard-row ${rank === 1 ? 'rank-1' : ''}">
                <div class="leaderboard-player-info">
                    <div class="leaderboard-rank-tag">${rank === 1 ? ICONS.crown : rank}</div>
                    <div style="font-weight: 800; color: ${p.color}; display: inline-flex; align-items: center; gap: 5px;">${getTokenSvg(p.tokenEmoji, 14)} <span>${p.name}</span></div>
                    ${bankruptTag}
                </div>
                <div class="leaderboard-wealth">₹${wealth.toLocaleString()}</div>
            </div>
        `;
    }).join("");

    gameOverModalEl.classList.add("open");
    addLog(`<strong>MATCH OVER!</strong> <strong>${winner.name}</strong> is the Winner!`, "buy");
}

// Handle Landed Space Rules (Preview card automatically if unowned or owned for upgrade!)
function handleLandedSpace(space: BoardSpace): void {
    const player = players[currentPlayerIndex];

    document.querySelectorAll(".space-highlight").forEach(el => el.classList.remove("space-highlight"));
    const spaceEl = document.getElementById(`space-${space.spaceIndex}`);
    if (spaceEl) spaceEl.classList.add("space-highlight");

    if (space.spaceIndex === 0) {
        player.money += gameConfig.startReward;
        addLog(`<strong>${player.name}</strong> landed directly on START! Collected <strong>₹${gameConfig.startReward.toLocaleString()}</strong> bonus salary.`, "money-gain");
        centerStatusMsgEl.textContent = `Landed on START! +₹${gameConfig.startReward.toLocaleString()} collected.`;
        enableTurnEnd();
    } else if (space.type === "corner") {
        if (space.name === "JAIL") {
            addLog(`<strong>${player.name}</strong> is visiting JAIL.`);
            centerStatusMsgEl.textContent = "Just visiting the lockup!";
        } else if (space.name === "RESTHOUSE") {
            addLog(`<strong>${player.name}</strong> is relaxing at the luxury RESTHOUSE.`);
            centerStatusMsgEl.textContent = "Enjoying the peaceful resthouse.";
        } else if (space.name === "CLUB") {
            addLog(`<strong>${player.name}</strong> visited the exclusive VIP CLUB!`);
            centerStatusMsgEl.textContent = "Partying at the VIP Club!";
        }
        enableTurnEnd();
    } else if (space.type === "chance") {
        drawTaskCard("chance");
    } else if (space.type === "community") {
        drawTaskCard("community");
    } else if (space.type === "property" || space.type === "white") {
        if (space.ownerId === null || space.ownerId === undefined) {
            // Unowned Property: Preview Card immediately!
            centerStatusMsgEl.textContent = `${space.name} is available for ₹${(space.buyingPrice || 0).toLocaleString()}`;
            if (player.money >= (space.buyingPrice || 0)) {
                btnBuyPropertyEl.style.display = "inline-flex";
                btnBuyPropertyEl.innerHTML = `${ICONS.buy} <span>Buy for ₹${(space.buyingPrice || 0).toLocaleString()}</span>`;
                btnBuyPropertyEl.onclick = () => {
                    buyProperty(space);
                };
            }
            // Automatically open property preview card modal
            openPropertyPreviewModal(space);
            enableTurnEnd();
        } else if (space.ownerId === player.id) {
            centerStatusMsgEl.textContent = `You own ${space.name}! Upgrade available.`;
            addLog(`<strong>${player.name}</strong> visited their own property <strong>${space.name}</strong>.`);
            // Automatically open property preview card modal with upgrade options
            openPropertyPreviewModal(space);
            enableTurnEnd();
        } else {
            const owner = players.find(p => p.id === space.ownerId)!;
            const rentAmount = getCurrentRent(space);
            const paid = resolveDebtAndPay(player, owner, rentAmount, `rent to ${owner.name} for ${space.name}`);
            if (paid) {
                addLog(`<strong>${player.name}</strong> paid <strong>₹${rentAmount.toLocaleString()}</strong> rent to <strong>${owner.name}</strong> for ${space.name}.`, "money-loss");
                centerStatusMsgEl.textContent = `Paid ₹${rentAmount.toLocaleString()} rent to ${owner.name}.`;
            }
            renderPlayers();
            enableTurnEnd();
        }
    }
}

// Draw Chance or Community Task Card from Shuffled Deck
function drawTaskCard(type: "chance" | "community"): void {
    const isChance = type === "chance";
    let deck = isChance ? chanceDeck : communityDeck;
    if (deck.length === 0) {
        deck = shuffle(isChance ? chanceTasks : communityTasks);
    }
    const card = deck.shift()!;
    if (isChance) chanceDeck = deck;
    else communityDeck = deck;

    const player = players[currentPlayerIndex];

    taskModalImgEl.src = card.image || (isChance ? "./assets/chance.jpg" : "./assets/community.jpg");
    taskModalTitleEl.textContent = card.title;
    taskModalDescEl.textContent = card.description;

    if (card.actionType === "money") {
        const isPos = card.value >= 0;
        taskModalValueEl.textContent = `${isPos ? "+" : "-"} ₹${Math.abs(card.value).toLocaleString()}`;
        taskModalValueEl.className = `task-modal-value ${isPos ? "positive" : "negative"}`;

        if (isPos) {
            player.money += card.value;
            addLog(`<strong>${player.name}</strong> drew ${isChance ? "Chance" : "Community"}: "${card.title}" (+₹${card.value}).`, "card");
        } else {
            const paid = resolveDebtAndPay(player, null, Math.abs(card.value), `for "${card.title}"`);
            if (paid) {
                addLog(`<strong>${player.name}</strong> drew ${isChance ? "Chance" : "Community"}: "${card.title}" (-₹${Math.abs(card.value)}).`, "card");
            }
        }
    } else if (card.actionType === "move") {
        taskModalValueEl.textContent = "ADVANCE TO START";
        taskModalValueEl.className = "task-modal-value positive";
        player.position = 0;
        player.money += gameConfig.startReward;
        updateTokensDisplay();
        addLog(`<strong>${player.name}</strong> moved directly to START and collected ₹${gameConfig.startReward.toLocaleString()}!`, "money-gain");
    }

    renderPlayers();
    taskModalEl.classList.add("open");
    saveGameState();

    taskModalDismissBtnEl.onclick = () => {
        taskModalEl.classList.remove("open");
        enableTurnEnd();
    };
}

// Enable End Turn
function enableTurnEnd(): void {
    isMoving = false;
    btnEndTurnEl.style.display = "inline-flex";
    saveGameState();
}

// End Turn Handler (skips eliminated bankrupt players)
function handleEndTurn(): void {
    btnBuyPropertyEl.style.display = "none";
    btnEndTurnEl.style.display = "none";
    btnRollDiceEl.disabled = false;

    // Advance to next active (non-bankrupt) player
    let nextIdx = (currentPlayerIndex + 1) % players.length;
    let checked = 0;
    while (players[nextIdx].isBankrupt && checked < players.length) {
        nextIdx = (nextIdx + 1) % players.length;
        checked++;
    }
    currentPlayerIndex = nextIdx;

    renderPlayers();
    updateTokensDisplay();

    const nextPlayer = players[currentPlayerIndex];
    centerStatusMsgEl.textContent = `${nextPlayer.name}'s turn. Click "Roll Dice" to proceed.`;
    saveGameState();

    checkGameEnd();
}

// LocalStorage Persistence Key
const STORAGE_KEY = "tycoon_bharat_save_state_v1";

interface SavedGameState {
    players: Player[];
    boardSpaces: BoardSpace[];
    currentPlayerIndex: number;
    isMatchStarted: boolean;
    setupCount: number;
    chanceDeck: TaskCard[];
    communityDeck: TaskCard[];
    logHtml: string;
    dice?: [number, number];
}

function saveGameState(): void {
    try {
        const state: SavedGameState = {
            players,
            boardSpaces,
            currentPlayerIndex,
            isMatchStarted,
            setupCount,
            chanceDeck,
            communityDeck,
            logHtml: logFeedEl.innerHTML,
            dice: currentDice
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn("Failed to save state to localStorage:", e);
    }
}

function loadGameState(): boolean {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const state: SavedGameState = JSON.parse(raw);
        if (!state.players || !state.boardSpaces || !Array.isArray(state.players) || state.players.length === 0) return false;

        players = state.players;
        boardSpaces = state.boardSpaces;
        currentPlayerIndex = state.currentPlayerIndex || 0;
        isMatchStarted = !!state.isMatchStarted;
        setupCount = state.setupCount || players.length;
        chanceDeck = state.chanceDeck || shuffle(chanceTasks);
        communityDeck = state.communityDeck || shuffle(communityTasks);

        if (state.dice && Array.isArray(state.dice) && state.dice.length === 2) {
            currentDice = [state.dice[0], state.dice[1]];
        }

        if (state.logHtml) {
            logFeedEl.innerHTML = state.logHtml;
        }

        renderBoard();
        renderPlayers();
        updateTokensDisplay();
        return true;
    } catch (e) {
        console.warn("Failed to load state from localStorage:", e);
        return false;
    }
}

function clearGameState(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn("Failed to clear localStorage:", e);
    }
}

// Setup Modal Player Inputs Generation (Clean Location Pin indicator + Name + Color)
function renderSetupInputs(): void {
    setupPlayerInputsEl.innerHTML = "";
    for (let i = 0; i < setupCount; i++) {
        const existing = players[i];
        const defaultName = existing ? existing.name : `Player ${i + 1}`;
        const defaultColor = existing ? existing.color : defaultColors[i % defaultColors.length];

        const row = document.createElement("div");
        row.className = "player-input-row";
        row.innerHTML = `
            <div class="player-input-num" style="display: flex; align-items: center; gap: 4px; color: ${defaultColor}; font-weight: 800;">
                ${getTokenSvg("pin", 14)}
                <span>P${i + 1}</span>
            </div>
            <input type="text" class="input-text" id="setupName-${i}" value="${defaultName}" placeholder="Player ${i + 1} Name">
            <input type="color" class="color-picker" id="setupColor-${i}" value="${defaultColor}">
        `;
        setupPlayerInputsEl.appendChild(row);
    }
}

// Open Player Setup Modal
function openSetupModal(): void {
    renderSetupInputs();
    setupModalEl.classList.add("open");
}

// Save Setup & Launch Match
function saveSetupAndStart(): void {
    const newPlayers: Player[] = [];
    for (let i = 0; i < setupCount; i++) {
        const nameInput = document.getElementById(`setupName-${i}`) as HTMLInputElement;
        const colorInput = document.getElementById(`setupColor-${i}`) as HTMLInputElement;

        newPlayers.push({
            id: i + 1,
            name: nameInput.value.trim() || `Player ${i + 1}`,
            money: gameConfig.startingMoney,
            color: colorInput.value || defaultColors[i % defaultColors.length],
            tokenEmoji: "pin",
            position: 0,
            inJail: false,
            jailTurns: 0,
            properties: [],
            isBankrupt: false
        });
    }

    players = newPlayers;
    currentPlayerIndex = 0;
    isMatchStarted = false;

    chanceDeck = shuffle(chanceTasks);
    communityDeck = shuffle(communityTasks);
    boardSpaces = createBoardSpaces(true);

    renderBoard();
    renderPlayers();
    renderDiePips(die1El, 3);
    renderDiePips(die2El, 4);

    setupModalEl.classList.remove("open");
    addLog(`Match configured with ${players.length} players! Roll the dice to start.`, "default");
    centerStatusMsgEl.textContent = `${players[0].name}'s turn. Click "Roll Dice" to start!`;
    saveGameState();
}

// Shuffle Board
function handleShuffleBoard(): void {
    if (isMatchStarted) return;
    boardSpaces = createBoardSpaces(true);
    renderBoard();
    addLog(`Board randomized! Corners remain fixed.`, "default");
    saveGameState();
}

// Restart Game
function handleRestartGame(): void {
    clearGameState();
    isMatchStarted = false;
    logFeedEl.innerHTML = "";
    addLog(`Game reset. Set up players for the new match!`, "default");

    chanceDeck = shuffle(chanceTasks);
    communityDeck = shuffle(communityTasks);
    boardSpaces = createBoardSpaces(true);

    renderBoard();
    renderPlayers();
    renderDiePips(die1El, 3);
    renderDiePips(die2El, 4);

    openSetupModal();
}

// Initialize Game
function initGame(): void {
    playerCountButtonsEl.querySelectorAll(".btn-count").forEach(btn => {
        btn.addEventListener("click", () => {
            playerCountButtonsEl.querySelectorAll(".btn-count").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            setupCount = parseInt(btn.getAttribute("data-count") || "4", 10);
            renderSetupInputs();
        });
    });

    btnOpenSetupEl.addEventListener("click", openSetupModal);
    btnSaveSetupEl.addEventListener("click", saveSetupAndStart);
    btnRollDiceEl.addEventListener("click", handleRollDice);
    btnEndTurnEl.addEventListener("click", handleEndTurn);
    btnShuffleBoardEl.addEventListener("click", handleShuffleBoard);
    btnRestartGameEl.addEventListener("click", handleRestartGame);

    // Setup Modal Close and Cancel
    setupModalCloseBtnEl?.addEventListener("click", () => {
        if (isMatchStarted || players.length > 0) {
            setupModalEl.classList.remove("open");
        }
    });

    btnCancelSetupEl?.addEventListener("click", () => {
        if (isMatchStarted || players.length > 0) {
            setupModalEl.classList.remove("open");
        }
    });

    // Task Modal Close
    taskModalCloseBtnEl?.addEventListener("click", () => {
        taskModalEl.classList.remove("open");
        enableTurnEnd();
    });

    // Game Over Play Again
    btnPlayAgainEl?.addEventListener("click", () => {
        gameOverModalEl.classList.remove("open");
        handleRestartGame();
    });

    // Backdrop Click Dismissal on all modal overlays
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                if (overlay.id === "setupModal" && (!isMatchStarted && players.length === 0)) return;
                if (overlay.id === "taskModal") enableTurnEnd();
                overlay.classList.remove("open");
            }
        });
    });

    // Global Escape Key to close modals
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (setupModalEl.classList.contains("open") && (isMatchStarted || players.length > 0)) {
                setupModalEl.classList.remove("open");
            }
            if (propertyModalEl.classList.contains("open")) {
                propertyModalEl.classList.remove("open");
            }
            if (taskModalEl.classList.contains("open")) {
                taskModalEl.classList.remove("open");
                enableTurnEnd();
            }
        }
    });

    const hasSaved = loadGameState();
    if (!hasSaved) {
        chanceDeck = shuffle(chanceTasks);
        communityDeck = shuffle(communityTasks);
        boardSpaces = createBoardSpaces(true);

        renderBoard();
        renderPlayers();
        renderDiePips(die1El, 3);
        renderDiePips(die2El, 4);

        // Prompt user setup modal immediately on first launch
        openSetupModal();
    } else {
        renderDiePips(die1El, currentDice[0]);
        renderDiePips(die2El, currentDice[1]);
        const activePlayer = players[currentPlayerIndex];
        if (activePlayer) {
            centerStatusMsgEl.textContent = `${activePlayer.name}'s turn.`;
        }
    }
}

document.addEventListener("DOMContentLoaded", initGame);