# Business Board Game (Tycoon Bharat) — Bug Audit & Resolution Report

This document records all rule discrepancies, logic flaws, state management bugs, and UI/UX issues identified during the comprehensive audit of the board game implementation against **Business Board Game / Monopoly rules (`rule.md`)**, along with their root causes and resolutions.

---

## 1. Summary of Identified & Resolved Bugs

| ID | Category | Severity | Description | Status |
|---|---|---|---|---|
| **BUG-01** | Rule / Game Loop | **Critical** | Negative balances allowed; no bankruptcy detection or debt handling (Violates Rules 30 & 31) | **Fixed** |
| **BUG-02** | Rule / Game Loop | **Critical** | No Game End or Victory evaluation; match never ends (Violates Rules 32 & 33) | **Fixed** |
| **BUG-03** | Rule / Scoring | **High** | White / Transport property rent failed to scale with multiple transport ownership (Violates Rule 20) | **Fixed** |
| **BUG-04** | Rule / Economy | **High** | Selling developed properties forfeited 100% of house and hotel investment without refund | **Fixed** |
| **BUG-05** | Logic / Turns | **High** | Eliminated/bankrupt players continued receiving turns and dice rolls | **Fixed** |
| **BUG-06** | UI / Navigation | **High** | Missing close button (`×`) and cancel button on Player Setup Modal; player trapped if opened mid-match | **Fixed** |
| **BUG-07** | UI / Modals | **Medium** | Missing top close button on Chance/Community Task Modal; modal backdrop click did not dismiss overlays | **Fixed** |
| **BUG-08** | Assets / Server | **High** | Case-sensitivity filename mismatches for corner space images (`./assets/darjeeling.jpg` vs `Darjeeling.jpg`) | **Fixed** |
| **BUG-09** | UI / Board Layout | **High** | Text inside corner tiles and side cards cut off by board `border-radius` and lack of safe inset padding | **Fixed** |
| **BUG-10** | UI / Image Fitting | **Medium** | Task modal image lacked framing rules and aspect ratio styling (`object-fit: cover`) | **Fixed** |
| **BUG-11** | State / Persistence | **Medium** | Dice roll pip values were lost on page reload because `dice` state was omitted from `localStorage` | **Fixed** |
| **BUG-12** | UI / Accessibility | **Low** | Keyboard `Escape` key failed to close active modals | **Fixed** |
| **BUG-13** | UI / Viewport | **High** | Page unwanted scrolling / vertical scrollbars caused by oversized 88vh board and unconstrained layout | **Fixed** |
| **BUG-14** | UI / Corner Layout | **Medium** | Resthouse corner space text overflowed tile boundaries due to word length and multi-line subtitle | **Fixed** |
| **BUG-15** | UI / Responsiveness | **High** | Large sidebar crowded the board on small screens; added compact mini user bar to prioritize board visibility | **Fixed** |

---

## 2. Detailed Bug Reports & Resolutions

### BUG-01: Negative Balances Allowed & Lack of Bankruptcy (Rule 30 & 31)
* **Problem**: When a player landed on an opponent's property with rent higher than their current cash (or drew a penalty card), the game directly subtracted the amount (`player.money -= rentAmount;`). This allowed balances to drop to negative figures (e.g. `-₹2,400`), completely violating **Rule 30 ("Player money cannot go below ₹0")** and **Rule 31 (Bankruptcy)**.
* **Root Cause**: `handleLandedSpace` and `drawTaskCard` had no solvency checks, liquidation flow, or debt handler.
* **Fix**: Implemented `resolveDebtAndPay(debtor, creditor, amount, reason)` and `handleBankruptcy(bankruptPlayer, creditor)`:
  1. Checks if player cash is sufficient.
  2. If cash is insufficient, calculates total net worth (`cash + 75% liquidation value of all owned properties and buildings`).
  3. If total net worth is less than the debt, triggers **Bankruptcy**: marks player `isBankrupt = true`, sets cash to `₹0`, transfers remaining cash and properties to the creditor (or clears houses and returns to bank if penalty card), and logs elimination with `💀`.
  4. If net worth is sufficient, liquidates properties step-by-step until the debt is settled.

---

### BUG-02: No Game Over / Victory Evaluation (Rule 32 & 33)
* **Problem**: The game ran indefinitely without ever checking if an end condition had been reached. Even when all other players were eliminated, the game kept cycling turns without declaring a winner.
* **Root Cause**: Absence of victory check and end-game modal.
* **Fix**:
  1. Added `checkGameEnd()` called after turn advancement and bankruptcy events.
  2. When only 1 active player remains, triggers `showGameOver(winner)`.
  3. Calculates final wealth for all players according to **Rule 33**:
     $$\text{Final Wealth} = \text{Cash} + \text{Property Buying Prices} + \text{House/Hotel Values}$$
  4. Displays an animated **Match Champion Celebration Modal** with a final standings leaderboard and a "Play New Match" action.

---

### BUG-03: Transport / White Properties Fixed at Base Rent (Rule 20)
* **Problem**: In business board games, owning multiple utility/transport properties (Indian Railways, Air India, Metro Transit, etc.) scales the rent collected (e.g. 1 = base, 2 = 2×, 3 = 4×, 4+ = 8×). In the codebase, `getCurrentRent` only evaluated color groups, causing white properties to always collect flat base rent (₹200).
* **Root Cause**: Missing transport property count logic in `getCurrentRent()`.
* **Fix**: Added dynamic transport property scaling in `getCurrentRent()`:
  ```ts
  if (space.type === "white" && space.ownerId) {
      const whiteOwned = boardSpaces.filter(s => s.type === "white" && s.ownerId === space.ownerId).length;
      if (whiteOwned === 2) return base * 2;
      if (whiteOwned === 3) return base * 4;
      if (whiteOwned >= 4) return base * 8;
      return base;
  }
  ```

---

### BUG-04: Selling Developed Property Forfeited 100% of Building Investment
* **Problem**: When selling an upgraded property (with 1–3 houses or a luxury hotel), the player only received 75% of the base land price. All houses and hotels were wiped (`space.houses = 0; space.hasHotel = false;`) with zero refund.
* **Root Cause**: `sellProperty` and `openPropertyPreviewModal` only used `space.sellingPrice || space.buyingPrice * 0.75`.
* **Fix**: Added `calculatePropertyRefund(space)` which computes 75% equity on both the land AND all constructed houses/hotels:
  ```ts
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
  ```

---

### BUG-05: Bankrupt Players Still Received Turns
* **Problem**: When a player went bankrupt, `handleEndTurn()` simply did `currentPlayerIndex = (currentPlayerIndex + 1) % players.length;`, giving turns to eliminated players. Bankrupt tokens also lingered on the board.
* **Root Cause**: Turn advancement and occupant token display lacked `player.isBankrupt` checks.
* **Fix**:
  1. `handleEndTurn` now iterates through players and skips any player with `isBankrupt === true`.
  2. `updateTokensDisplay` ignores bankrupt players so eliminated tokens are removed from the board.
  3. `renderPlayers` styles bankrupt cards with `.bankrupt-card` (grayscale, red border, and `💀 Eliminated` tag).

---

### BUG-06: Missing Close & Cancel Buttons on Menus (Player Setup Modal)
* **Problem**: The Player Setup Modal (`#setupModal`) lacked a close button (`×`) in the header and had only a "Start Match" button in the footer. If a player clicked "⚙️ Setup Players" during an ongoing game to check or adjust settings, they could not exit without restarting the entire match.
* **Root Cause**: Hardcoded setup modal layout designed solely for onboarding without cancellation options.
* **Fix**:
  1. Added `<button class="modal-close-btn" id="setupModalCloseBtn">&times;</button>` to the modal header.
  2. Added a "Cancel" button (`#btnCancelSetup`) alongside "Start Match".
  3. Bound both buttons to close the modal safely without disrupting the active match.

---

### BUG-07: Missing Close Button on Task Modal & Backdrop Click Dismissal
* **Problem**:
  - The Chance/Community Task Modal had only a single "Continue" button at the bottom and lacked a top-right close button (`×`).
  - Clicking outside the modal on the darkened overlay backdrop (`.modal-overlay`) did nothing for all modals.
* **Root Cause**: Missing close buttons and lack of overlay click event delegation.
* **Fix**:
  1. Added `taskModalCloseBtn` to `#taskModal`.
  2. Added global backdrop click dismissal:
     ```ts
     document.querySelectorAll(".modal-overlay").forEach(overlay => {
         overlay.addEventListener("click", (e) => {
             if (e.target === overlay) {
                 if (overlay.id === "setupModal" && (!isMatchStarted && players.length === 0)) return;
                 if (overlay.id === "taskModal") enableTurnEnd();
                 overlay.classList.remove("open");
             }
         });
     });
     ```

---

### BUG-08: Case Sensitivity in Corner Space Image Paths
* **Problem**: In `data/Properties.ts`, corner spaces specified lowercase asset filenames (`./assets/darjeeling.jpg`, `./assets/goa.jpg`, `./assets/mumbai.jpg`, `./assets/delhi.jpg`), while the filesystem has capitalized filenames (`Darjeeling.jpg`, `Goa.jpg`, `Mumbai.jpg`, `Delhi.jpg`). On Linux, macOS, or production web hosts (Vercel, Netlify, GitHub Pages), this resulted in HTTP 404 broken images.
* **Root Cause**: Inconsistent filename casing in `data/Properties.ts`.
* **Fix**: Corrected all corner space asset paths to match the exact casing of the `./assets/` directory.

---

### BUG-09: Text & Chips Clipped by Board Border Radius
* **Problem**: The outer `.board` element used `border-radius: var(--radius-xl)` with `overflow: hidden`, causing the text and occupant chips in corner tiles (START, RESTHOUSE, CLUB, JAIL) and adjacent side cards to clip against the curved corners.
* **Root Cause**: Insufficient padding and overly aggressive outer board radius.
* **Fix**:
  1. Moderated `.board` radius to `12px`.
  2. Added safe-inset corner padding:
     - Bottom-Left (START): `padding: 6px 6px 10px 10px;`
     - Top-Left (RESTHOUSE): `padding: 10px 6px 6px 10px;`
     - Top-Right (CLUB): `padding: 10px 10px 6px 6px;`
     - Bottom-Right (JAIL): `padding: 6px 10px 10px 6px;`
  3. Added `box-sizing: border-box;` and responsive clamping to `.card-bottom-content`.

---

### BUG-10: Image Fitting in Task Modal
* **Problem**: In the task modal, the card illustration image lacked dedicated responsive CSS rules, leading to potential stretching or distortion depending on viewport size.
* **Root Cause**: Reliance on minimal inline styles without dedicated framing.
* **Fix**: Created `.task-img-wrap` and `.task-img-wrap img` CSS rules with `width: 100%; height: 140px; object-fit: cover; object-position: center; border-radius: var(--radius-lg);`.

---

### BUG-11: Dice State Lost on Reload
* **Problem**: On page reload, even though player cash, positions, and logs were restored from `localStorage`, the dice always defaulted to showing 3 and 4.
* **Root Cause**: `currentDice` was not included in the `SavedGameState` interface or persistence payload.
* **Fix**: Added `dice?: [number, number]` to `SavedGameState`, saving `currentDice` on every roll and restoring pips upon reload.

---

### BUG-12: Keyboard Accessibility (Escape Key)
* **Problem**: Users could not dismiss modals by pressing the standard `Escape` keyboard key.
* **Fix**: Added global `window.addEventListener("keydown", (e) => { if (e.key === "Escape") ... })` to gracefully close active modals.

---

### BUG-13: Page Unwanted Scrolling / Viewport Overflow
* **Problem**: The game page exhibited vertical scrollbars on standard laptop and desktop screens (1080p and 768p displays), requiring the user to scroll up and down to see the board and side panel.
* **Root Cause**:
  1. `body` had `min-height: 100vh; overflow-x: hidden;` with no hard height boundary.
  2. `.board-wrapper` height was `88vh`, which combined with the `55px` header and `24px` padding exceeded `100vh`.
  3. Modals and side panels lacked explicit viewport max-heights, pushing the page height when content expanded.
* **Fix**:
  1. Applied `height: 100vh; height: 100dvh; overflow: hidden;` to `html, body`.
  2. Made `.app-header` compact at `48px` fixed height.
  3. Set `.app-layout` to `height: calc(100vh - 48px); overflow: hidden; align-items: stretch;`.
  4. Sized `.board-wrapper` dynamically with `width: min(calc(100vh - 64px), calc(100vw - 300px), 880px); height: min(calc(100vh - 64px), calc(100vw - 300px), 880px); aspect-ratio: 1 / 1;` so the board always fits completely in the viewport.
  5. Contained `.side-panel` with `height: 100%; overflow-y: auto;` and sleek custom scrollbars.
  6. Added `max-height: 90vh; overflow-y: auto;` to all modal cards so modals scroll internally.

---

### BUG-14: Resthouse Corner Tile Text Overflow
* **Problem**: In the top-left corner space (Space 9: RESTHOUSE), the text overflowed the tile boundary, clipping and spilling outside the corner card.
* **Root Cause**:
  1. "RESTHOUSE" is 9 capital letters with no spaces, making it more than double the width of START, CLUB, or JAIL.
  2. The subtitle was set to the lengthy 18-character phrase `"Free Resort & Rest"`, which wrapped onto 3 vertical lines.
  3. The corner space had `padding: 10px 6px 6px 10px;`, leaving insufficient width/height for title, subtitle, top badge, and player occupant pills.
* **Fix**:
  1. Shortened the subtitle in `data/Properties.ts` to concise `"Free Rest"`, fitting on a single clean line.
  2. Adjusted `.corner-space.space-pos-9 .space-inner` padding to `6px 4px 4px 6px;` and added `overflow: hidden;`.
  3. Set `.corner-body` to `max-width: 100%; overflow: hidden;`.
  4. Added `.space-pos-9 .corner-title` responsive scaling (`font-size: clamp(7px, 0.92vw, 9.8px); letter-spacing: -0.3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`) guaranteeing "RESTHOUSE" never wraps or bleeds outside the tile.
  5. Added `white-space: nowrap; text-overflow: ellipsis;` to `.corner-desc`.

---

### BUG-15: Small Screen Board Visibility & Compact Mini User Bar
* **Problem**: On small screens, tablets, or compact windows, the bulky 260px sidebar competed for screen real estate, reducing the board size and hurting game readability.
* **Root Cause**: Fixed 2-column layout or vertical stacking of the sidebar above the board forced the board to shrink significantly to avoid scrolling.
* **Fix**:
  1. Added a responsive mini user component (`.mobile-player-strip` / `#mobilePlayerStrip`) inside the board container.
  2. Renders compact player pills showing player avatar, token emoji, name, abbreviated cash balance (`₹15k`), and active turn indicators (`TURN`).
  3. Under `@media (max-width: 960px)` and `@media (max-height: 720px)`, the bulky `.side-panel` is hidden (`display: none !important`), and the mini player strip is displayed above the board taking only ~30px of vertical space.
  4. Maximized `.board-wrapper` dimensions to `width: min(calc(100vh - 95px), calc(100dvh - 95px), 98vw, 680px); aspect-ratio: 1 / 1;` so the board stays large, centered, and 100% visible on any screen.

---

## 3. Verification & Validation

1. **TypeScript Build**:
   ```bash
   npx tsc --target ES2022 --module ESNext script.ts data/Properties.ts types.ts data/propertystates.ts
   ```
   *Result: Exited with code 0 (No syntax or type errors).*
2. **Game Loop Verification**:
   - Rent deduction properly invokes `resolveDebtAndPay`.
   - Players unable to pay declare bankruptcy and are eliminated with status badges.
   - Victory modal triggers with Rule 33 leaderboard when 1 solvent player remains.
   - All modals dismiss via close buttons, cancel buttons, backdrop clicks, and `Escape` key.
   - All 28 asset image paths verified against filesystem.
