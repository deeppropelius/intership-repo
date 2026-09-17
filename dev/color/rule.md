# Business Board Game — Rules

## 1. Game Objective

The objective of the game is to become the most financially successful player by:

* Buying properties
* Collecting rent
* Building wealth
* Making strategic trades
* Completing special tasks
* Managing money carefully

The game ends when the configured end-game condition is reached.

The winner is determined according to the game's final wealth/scoring rules.

---

# 2. Players

Recommended:

* Minimum: 2 players
* Maximum: 4 players

Each player has:

* A unique player token
* Starting money
* A position on the board
* A collection of properties
* A current turn
* A personal balance

Example:

```text
Player
├── ID
├── Name
├── Token Color
├── Money
├── Position
└── Properties
```

---

# 3. Starting the Game

At the beginning:

1. All players select a token.
2. Each player receives the configured starting money.
3. All players start at **START**.
4. Properties initially have no owner.
5. Chance and Community decks are shuffled.
6. The board property order is randomized.
7. The first player is selected.
8. The game begins.

---

# 4. Board

The board contains:

### Colored Properties

There are 4 property groups:

| Group  | Color | Number |
| ------ | ----- | -----: |
| Red    | 🔴    |      5 |
| Yellow | 🟡    |      5 |
| Blue   | 🔵    |      5 |
| Green  | 🟢    |      5 |

Total:

**20 colored properties**

### White Properties

There are:

**6 white/non-state properties**

### Special Spaces

The board also contains:

* Start
* Jail
* Club
* Resthouse
* Chance
* Community

---

# 5. Corner Positions

The four corner spaces are fixed.

Starting from the **bottom-left** and moving clockwise:

```text
Bottom Left  → START
Bottom Right → JAIL
Top Right    → CLUB
Top Left     → RESTHOUSE
```

Clockwise order:

```text
START
  ↓
JAIL
  ↓
CLUB
  ↓
RESTHOUSE
  ↓
START
```

These positions must never be randomized.

---

# 6. Random Board Arrangement

Normal board spaces can be randomly arranged when a new game starts.

Randomizable spaces include:

* Red properties
* Yellow properties
* Blue properties
* Green properties
* White properties
* Chance
* Community

The following remain fixed:

* START
* JAIL
* CLUB
* RESTHOUSE

Once the game begins, the board order should remain unchanged for that game.

---

# 7. Turn Order

Players take turns clockwise.

Example:

```text
Player 1
   ↓
Player 2
   ↓
Player 3
   ↓
Player 4
   ↓
Player 1
```

The current player should always be clearly displayed in the UI.

---

# 8. Turn Sequence

A player's turn follows this sequence:

```text
START TURN
    ↓
ROLL DICE
    ↓
CALCULATE MOVEMENT
    ↓
MOVE PLAYER
    ↓
LAND ON SPACE
    ↓
PROCESS SPACE
    ↓
PLAYER ACTION
    ↓
END TURN
```

---

# 9. Rolling the Dice

The player rolls the dice once per normal turn.

Example:

```text
Dice 1 = 4
Dice 2 = 3

Total = 7
```

The player moves:

**7 spaces**

The dice result should be displayed clearly.

---

# 10. Player Movement

Players move clockwise around the board.

Example:

```text
Current Position: 12
Dice Result: 5

12 → 13 → 14 → 15 → 16 → 17
```

The player token should animate through the spaces.

---

# 11. Passing START

If a player passes START during movement, they receive the configured START reward.

Example:

```text
START reward = ₹200
```

If the player passes START:

```text
Player Balance
₹1,000
   +
₹200
   =
₹1,200
```

The exact reward should come from the game configuration.

---

# 12. Landing on START

If a player lands directly on START, apply the configured START rule.

The game configuration should determine whether:

* The player receives the normal reward
* The player receives a bonus
* Nothing happens

---

# 13. Buying a Property

When a player lands on an unowned property, they may be given the option to purchase it.

Example:

```text
Property:
Gujarat

Price:
₹500

Player Money:
₹1,200
```

The player can choose:

```text
[ BUY PROPERTY ]
[ SKIP ]
```

If the player buys:

```text
₹1,200 - ₹500 = ₹700
```

The property owner becomes the current player.

---

# 14. Property Ownership

Each property can have only one owner.

Example:

```text
Property:
Gujarat

Owner:
🔴 Alex
```

The property should visually display the owner's identity.

Possible indicators:

* Player color
* Token
* Border
* Owner badge
* Player initials

---

# 15. Insufficient Money

A player cannot purchase a property if:

```text
Player Money < Property Price
```

Example:

```text
Money: ₹300
Property Price: ₹500
```

The Buy button should be disabled.

Display:

```text
Insufficient funds.
You need ₹200 more.
```

---

# 16. Landing on an Owned Property

If a player lands on another player's property, the player must pay the applicable rent.

Example:

```text
Property Owner:
Alex

Current Player:
Sam

Rent:
₹50
```

Transaction:

```text
Sam  →  -₹50
Alex →  +₹50
```

The transaction should appear in the game log.

---

# 17. Landing on Your Own Property

If a player lands on their own property:

* No rent is paid.
* No purchase is required.
* The turn continues/end according to the normal turn flow.

Example:

```text
You own this property.

No rent required.
```

---

# 18. Property Groups

Properties are grouped by color.

### Red

5 properties

### Yellow

5 properties

### Blue

5 properties

### Green

5 properties

A player can own multiple properties from the same group.

---

# 19. Complete Property Group

A player may receive a special benefit if they own all properties in a color group.

Example:

```text
RED GROUP

🔴 Property 1 — Alex
🔴 Property 2 — Alex
🔴 Property 3 — Alex
🔴 Property 4 — Alex
🔴 Property 5 — Alex

GROUP COMPLETE
```

The exact benefit should be configurable.

Possible benefits:

* Increased rent
* Discount on upgrades
* Bonus income
* Special ability

---

# 20. White Properties

White properties are independent properties.

They:

* Do not belong to red/yellow/blue/green groups.
* Can be purchased.
* Can generate rent.
* Can have their own special rules.

Example:

```text
WHITE PROPERTY

Central Mall

Price:
₹800

Rent:
₹80
```

---

# 21. Chance Spaces

Chance spaces trigger a random Chance task.

When a player lands on Chance:

```text
LAND ON CHANCE
       ↓
DRAW CHANCE CARD
       ↓
DISPLAY TASK
       ↓
APPLY EFFECT
       ↓
CONTINUE
```

Example:

```text
❓ CHANCE

You received a business bonus.

+₹200

[ CONTINUE ]
```

---

# 22. Community Spaces

Community spaces trigger a random Community task.

Example:

```text
🎁 COMMUNITY

Community event:
Pay ₹100 for a local event.

-₹100

[ CONTINUE ]
```

---

# 23. Chance & Community Decks

Chance and Community tasks should be stored separately.

```js
chanceTasks = []

communityTasks = []
```

Each deck should be shuffled when the game starts.

Example:

```text
Chance Deck

1. Receive ₹200
2. Pay ₹100
3. Move forward 3 spaces
4. Go to Club
5. Receive ₹150
```

The exact tasks come from the game's configuration.

---

# 24. Avoid Repeating Cards

Cards should preferably be drawn from a shuffled deck.

Example:

```text
Shuffle
   ↓
Card 1
   ↓
Card 2
   ↓
Card 3
   ↓
...
```

After the deck is exhausted, shuffle it again.

This prevents the same card from being selected repeatedly at random.

---

# 25. Jail

The Jail space is located at the **bottom-right corner**.

Landing on Jail does not automatically mean the player is imprisoned unless the game configuration says so.

The game can support:

```text
VISIT JAIL
```

and/or

```text
SEND TO JAIL
```

as separate mechanics.

---

# 26. Club

The Club space is located at the **top-right corner**.

The Club can trigger a special game action.

Possible rules:

* Receive bonus
* Pay membership
* Draw a special card
* Move to another space
* Skip an action

The exact Club behavior should be configurable.

---

# 27. Resthouse

The Resthouse space is located at the **top-left corner**.

The Resthouse can be a special resting/safe space.

Possible behavior:

* No payment
* Receive bonus
* Skip penalty
* Trigger a special task

The exact rule should be configurable.

---

# 28. Trading

Players can trade properties and money.

A trade can contain:

```text
Player A gives:
- Property A
- ₹200

Player B gives:
- Property B
```

Both players must confirm the trade.

Example:

```text
TRADE OFFER

Alex offers:
🏠 Gujarat
₹200

Sam offers:
🏠 Mumbai

[ ACCEPT ]
[ REJECT ]
```

A trade should only happen after both parties confirm.

---

# 29. Money Transactions

All money changes should be recorded.

Examples:

```text
BUY PROPERTY
Alex -₹500

RENT
Sam -₹50
Alex +₹50

CHANCE
Alex +₹200

TAX
Alex -₹100
```

The UI should display transaction notifications.

---

# 30. Negative Balance

The game should define whether negative balances are allowed.

Recommended rule:

```text
Player money cannot go below ₹0
```

If a player cannot pay an amount, trigger the configured bankruptcy/debt rules.

---

# 31. Bankruptcy

A player can become bankrupt if they cannot pay their required amount.

Possible process:

```text
Cannot Pay
    ↓
Sell Assets
    ↓
Trade Assets
    ↓
Still Cannot Pay
    ↓
BANKRUPT
```

A bankrupt player's properties can be:

* Returned to the bank
* Transferred to the creditor
* Auctioned

The exact behavior should be configurable.

---

# 32. Game End

The game should support a configurable end condition.

Possible conditions:

### Time Limit

```text
Game duration = 30 minutes
```

### Bankruptcy

```text
Only one active player remains
```

### Property Completion

```text
A player owns the required number of properties
```

### Target Wealth

```text
Player reaches ₹10,000
```

The game should use one clearly defined end condition.

---

# 33. Winner Calculation

At game end, calculate each player's final value.

Example:

```text
Cash
+
Property Values
+
Bonuses
-
Debts
=
Final Wealth
```

Example:

```text
Alex

Cash:              ₹2,000
Properties:        ₹4,500
Bonuses:              ₹500
Debts:                ₹0
---------------------------
Final Wealth:       ₹7,000
```

The winner is determined according to the configured scoring system.

---

# 34. Game Log

Every important event should be recorded.

Example:

```text
GAME LOG

🔵 Alex rolled 7.

🔵 Alex landed on Gujarat.

🔵 Alex purchased Gujarat for ₹500.

🟢 Sam rolled 5.

🟢 Sam landed on Gujarat.

🟢 Sam paid ₹50 rent to Alex.

🔴 Mia landed on Chance.

❓ Chance:
Mia received ₹200.
```

---

# 35. Game State

The application should maintain a central game state.

Example:

```js
const gameState = {
  currentPlayerId: "player-1",

  turnNumber: 12,

  status: "playing",

  board: [],

  players: [],

  chanceDeck: [],

  communityDeck: [],

  dice: {
    first: 0,
    second: 0,
    total: 0
  },

  activeTask: null,

  gameLog: []
};
```

---

# 36. Turn States

The game should support clear states.

```text
WAITING
   ↓
ROLLING
   ↓
MOVING
   ↓
LANDED
   ↓
ACTION_REQUIRED
   ↓
TASK
   ↓
TURN_COMPLETE
   ↓
NEXT_PLAYER
```

This prevents invalid actions.

---

# 37. Invalid Actions

Players should not be able to perform actions outside the current game state.

Examples:

### During another player's turn

Disable:

```text
Roll Dice
Buy
Trade
```

### During dice animation

Disable:

```text
Roll Dice
```

### During a Chance task

Require:

```text
Continue
```

before proceeding.

---

# 38. Game UI Requirements

The UI should always show:

* Current player
* Current balance
* Dice
* Board
* Player positions
* Available action
* Property ownership
* Game events

The user should never have to guess what action they need to take.

---

# 39. Responsive Rules

The board must be responsive.

Desktop:

```text
Board + Player Panel + Action Panel
```

Tablet:

```text
Player Information
       ↓
Board
       ↓
Actions
```

Mobile:

```text
Header
   ↓
Current Player
   ↓
Board
   ↓
Dice
   ↓
Actions
   ↓
Game Log
```

The board must maintain:

```css
aspect-ratio: 1 / 1;
```

It must never cause horizontal scrolling.

---

# 40. Property Information

When a player views a property, show:

```text
Property Image

Property Name

Color Group

Buying Price

Rent

Owner

Description

Available Actions
```

Example:

```text
┌─────────────────────────┐
│       PROPERTY IMAGE    │
│                         │
│       GUJARAT           │
│       🔴 RED            │
│                         │
│       BUY ₹500          │
│       RENT ₹50          │
│                         │
│       OWNER: ALEX       │
└─────────────────────────┘
```

---

# 41. Dice Rules

Normal turn:

```text
Roll two dice
↓
Add values
↓
Move total spaces
↓
Process destination
```

Example:

```text
4 + 6 = 10
```

The dice result should be saved in the game state.

---

# 42. Game Data Must Be Configurable

Avoid hard-coding game rules into UI components.

Keep configurable values in game data.

Example:

```js
const gameConfig = {
  startingMoney: 1500,

  startReward: 200,

  maxPlayers: 4,

  propertyGroups: {
    red: 5,
    yellow: 5,
    blue: 5,
    green: 5
  },

  whiteProperties: 6,

  chanceCount: 4,

  communityCount: 4
};
```

---

# 43. Separation of UI and Game Logic

The UI should display the game state.

Game rules should be handled separately.

Recommended:

```text
Game Engine
     ↓
Game State
     ↓
UI
```

Do not put complex game rules directly inside visual components.

Example:

```text
gameEngine.rollDice()
gameEngine.movePlayer()
gameEngine.buyProperty()
gameEngine.payRent()
gameEngine.drawChance()
gameEngine.drawCommunity()
gameEngine.endTurn()
```

The UI then displays the result.

---

# 44. Core Game Loop

```text
GAME START
    ↓
SET PLAYER ORDER
    ↓
SHUFFLE BOARD SPACES
    ↓
SHUFFLE CHANCE DECK
    ↓
SHUFFLE COMMUNITY DECK
    ↓
CURRENT PLAYER
    ↓
ROLL DICE
    ↓
MOVE
    ↓
LAND
    ↓
PROCESS SPACE
    ↓
ACTION
    ↓
UPDATE GAME STATE
    ↓
CHECK GAME END
    ↓
NEXT PLAYER
    ↓
REPEAT
```

---

# 45. Final Rules Summary

The basic game flow is:

```text
1. Start game
2. Give players starting money
3. Randomize normal board spaces
4. Shuffle Chance and Community decks
5. Select first player
6. Roll dice
7. Move clockwise
8. Process landing space
9. Buy property if available
10. Pay rent if property is owned
11. Execute Chance/Community task when required
12. Update player balances
13. Record the action
14. Check end-game condition
15. Move to next player
16. Repeat
17. Calculate final wealth
18. End game
```

---

# 46. Rule Configuration

All business-specific values should be configurable rather than hard-coded.

Examples:

```js
const rules = {
  startingMoney: 1500,

  startReward: 200,

  diceCount: 2,

  maxPlayers: 4,

  allowTrading: true,

  allowNegativeBalance: false,

  allowPropertySelling: true,

  allowPropertyTrading: true,

  completeGroupBonus: true,

  bankruptcyEnabled: true
};
```

This allows the game business to change rules later without rebuilding the entire UI.

---

# 47. Important Implementation Principle

The **board data, game rules, and UI must be separate**.

```text
                    GAME
                     │
          ┌──────────┴──────────┐
          │                     │
      GAME DATA             GAME RULES
          │                     │
          └──────────┬──────────┘
                     ↓
                 GAME STATE
                     ↓
                     UI
```

The UI should never be responsible for deciding whether a move is legal.

The game engine should decide the result, and the UI should display it.

---

# 48. Board-Specific Final Requirements

The final board must satisfy all of the following:

* 20 colored state properties
* 5 Red properties
* 5 Yellow properties
* 5 Blue properties
* 5 Green properties
* 6 White properties
* Chance spaces
* Community spaces
* Randomized normal-space order
* Fixed corner positions
* START at bottom-left
* JAIL at bottom-right
* CLUB at top-right
* RESTHOUSE at top-left
* Clockwise movement
* Center Chance/Community task area
* Property images
* Property names
* Buying prices
* Property ownership
* Player tokens
* Dice
* Responsive board
* Mobile support
* Game event log
* Turn indicator
* Configurable rules

---

# 49. Golden Rule

**The player should always know three things:**

> Where am I?

> What happened?

> What can I do now?

Every UI and game-rule decision should support these three questions.
