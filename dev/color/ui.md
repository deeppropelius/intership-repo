# Board Game UI Specification

## 1. Overview

Build a responsive web-based board game UI inspired by classic property-trading board games.

The game board should have a visually attractive square layout with:

* 4 colored property groups
* 5 states/properties per color group
* 20 colored properties total
* 6 white/non-state properties
* Chance spaces
* Community spaces
* 4 special corner spaces
* Randomized property ordering
* Center area displaying Chance and Community tasks/cards
* Player tokens
* Property purchase information
* Property images
* Dice/game controls

The UI must work smoothly on:

* Desktop
* Laptop
* Tablet
* Mobile

The board should always remain square and fit inside the available viewport.

---

# 2. Board Structure

## Property Groups

There are exactly **4 color groups**.

| Group  | Color     | Properties |
| ------ | --------- | ---------: |
| Red    | `#E53935` |          5 |
| Yellow | `#FBC02D` |          5 |
| Blue   | `#1E88E5` |          5 |
| Green  | `#43A047` |          5 |

Total colored properties:

**4 × 5 = 20**

---

# 3. White / Non-State Properties

There are **6 white properties**.

These properties:

* Do not belong to a state color group
* Use a white/light background
* Should have a different visual style
* Can represent businesses, utilities, landmarks, transport, or other special purchasable locations

Example:

```js
{
  id: "white-01",
  type: "property",
  group: "white",
  name: "Property Name",
  price: 250,
  image: "/images/property.jpg"
}
```

The actual names, images, prices, and descriptions should come from the supplied game data.

---

# 4. Special Spaces

The board contains:

* Start
* Jail
* Club
* Resthouse
* Chance
* Community

The four corner spaces must have a special visual design and must be larger/more prominent than normal properties.

---

# 5. Corner Arrangement

The four corners must be arranged **clockwise starting from the bottom-left corner**.

Required order:

```text
Bottom Left
    ↓
START

Bottom Right
    ↓
JAIL

Top Right
    ↓
CLUB

Top Left
    ↓
RESTHOUSE
```

Visual representation:

```text
┌───────────────┬───────────────────────┬───────────────┐
│               │                       │               │
│  RESTHOUSE    │                       │     CLUB      │
│               │                       │               │
├───────────────┤                       ├───────────────┤
│               │                       │               │
│               │                       │               │
│               │      GAME CENTER      │               │
│               │                       │               │
├───────────────┤                       ├───────────────┤
│               │                       │               │
│    START      │                       │      JAIL     │
│               │                       │               │
└───────────────┴───────────────────────┴───────────────┘
```

The corner positions are fixed.

Do not randomize the corner positions.

---

# 6. Board Layout

Use a square CSS Grid.

Recommended conceptual structure:

```text
┌───────┬───┬───┬───┬───┬───┬───┬───┬───────┐
│       │   │   │   │   │   │   │   │       │
│ REST  │ P │ P │ P │ P │ P │ W │ C │ CLUB  │
│ HOUSE │   │   │   │   │   │   │   │       │
├───────┤   │   │   │   │   │   │   ├───────┤
│       │   │                       │   │       │
│       │ P │                       │ P │       │
│       │   │       CENTER          │   │       │
├───────┤   │    CHANCE /           │   ├───────┤
│       │   │    COMMUNITY          │   │       │
│       │ W │       TASKS           │ W │       │
│       │   │                       │   │       │
├───────┤   │                       │   ├───────┤
│ START │ P │                       │ P │ JAIL  │
│       │   │                       │   │       │
└───────┴───┴───┴───┴───┴───┴───┴───┴───────┘
```

The exact number and order of normal cells should come from the game data.

---

# 7. Important Board Rule

The **outer ring contains all spaces**.

The center is not part of the movement path.

Players move around the outside perimeter of the board.

The center is reserved for:

* Chance cards/tasks
* Community cards/tasks
* Current task
* Game information

---

# 8. Randomized Property Ordering

The normal property spaces should be randomly arranged.

Randomization applies to:

* Red properties
* Yellow properties
* Blue properties
* Green properties
* White properties
* Chance spaces
* Community spaces

Randomization must **not** affect:

* Start
* Jail
* Club
* Resthouse

Those four positions remain fixed.

### Important

The random order should be generated from data.

Do not manually place each property in the JSX/HTML.

Example:

```js
const randomizedBoard = shuffle(boardProperties);
```

However, the randomization should happen at the appropriate game initialization stage rather than on every React render.

---

# 9. Recommended Data Structure

The board should be data-driven.

Example:

```js
const boardSpaces = [
  {
    id: "start",
    type: "corner",
    subtype: "start",
    name: "Start"
  },

  {
    id: "property-red-1",
    type: "property",
    group: "red",
    name: "State Name",
    price: 500,
    image: "/images/state-1.jpg"
  },

  {
    id: "chance-1",
    type: "chance",
    name: "Chance"
  },

  {
    id: "community-1",
    type: "community",
    name: "Community"
  },

  {
    id: "jail",
    type: "corner",
    subtype: "jail",
    name: "Jail"
  }
];
```

---

# 10. Property Data

Every property should support:

```js
{
  id: "property-01",

  type: "property",

  group: "red",

  name: "Example State",

  price: 500,

  image: "/images/example-state.jpg",

  description: "Short description",

  rent: 50,

  ownerId: null
}
```

Additional fields can be added depending on the existing game data.

---

# 11. Property Card Design

Each property must display information in an attractive way.

A property cell should contain:

```text
┌──────────────────────┐
│ ████████████████████ │
│                      │
│      [ IMAGE ]       │
│                      │
│   GUJARAT            │
│                      │
│   ₹500               │
│   BUY PROPERTY       │
│                      │
└──────────────────────┘
```

The exact content should adapt to the supplied data.

---

# 12. Property Image

Every property should support an image.

Image requirements:

* Responsive
* Correct aspect ratio
* Rounded corners
* `object-fit: cover`
* Lazy loaded when appropriate
* No image overflow
* Fallback image when an image is unavailable

Example:

```css
.property-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
}
```

---

# 13. Attractive Property Price

The buying price should be highly visible.

Example:

```text
₹500
```

Use:

* Large font
* Bold weight
* Strong contrast
* Currency formatting
* Optional price icon

Example:

```text
💰 ₹500
```

Do not hide the price inside a tooltip.

The price should be visible directly on the property card whenever the cell size allows it.

---

# 14. Color Group Design

Each state group must have a consistent color identity.

## Red

```css
--group-red: #E53935;
```

## Yellow

```css
--group-yellow: #FBC02D;
```

## Blue

```css
--group-blue: #1E88E5;
```

## Green

```css
--group-green: #43A047;
```

The group color can be used for:

* Top property strip
* Border
* Badge
* Glow
* Price accent
* Ownership indicator

Do not make the entire property cell extremely saturated.

Use the group color as an accent.

---

# 15. White Property Design

White properties should visually differ from colored state properties.

Example:

```text
┌──────────────────────┐
│                      │
│      [ IMAGE ]       │
│                      │
│    CENTRAL MALL      │
│                      │
│      ₹800            │
│                      │
└──────────────────────┘
```

Use:

```css
background: #FFFFFF;
border: 2px solid #E5E7EB;
```

---

# 16. Chance Space

Chance spaces should be visually recognizable.

Example:

```text
┌────────────────────┐
│                    │
│        ❓          │
│                    │
│      CHANCE        │
│                    │
└────────────────────┘
```

Use a dedicated accent color.

Possible design:

* Purple/indigo
* Question mark icon
* Card-style appearance
* Slight rotation/shadow
* Distinctive border

---

# 17. Community Space

Community spaces should have their own visual identity.

Example:

```text
┌────────────────────┐
│                    │
│        🎁          │
│                    │
│     COMMUNITY      │
│                    │
└────────────────────┘
```

Do not make Chance and Community visually identical.

They should be immediately distinguishable.

---

# 18. Center Board Area

The center of the board must contain the Chance and Community task area.

The center should feel like the main game area.

Recommended:

```text
┌────────────────────────────────┐
│                                │
│       🎲 GAME CENTER            │
│                                │
│   ┌──────────┐ ┌──────────┐    │
│   │ CHANCE   │ │COMMUNITY │    │
│   │  ❓odd │ │    🎁 even │    │
│   └──────────┘ └──────────┘    │


  community even   chance odd
│                                │
│       CURRENT TASK             │
│                                │
│  "Pay ₹100 for city tax"       │
│                                │
│        [ CONTINUE ]            │
│                                │
└────────────────────────────────┘
```

---

# 19. Chance / Community Task Cards

When a player lands on Chance or Community, show the corresponding task in the center.

Example:

```text
┌──────────────────────────────┐
│          ❓ CHANCE           │
├──────────────────────────────┤
│                              │
│     LUCKY INVESTMENT         │
│                              │
│  Receive ₹200 from the bank  │
│                              │
│        + ₹200                │
│                              │
│       [ CONTINUE ]           │
└──────────────────────────────┘
```

Community example:

```text
┌──────────────────────────────┐
│        🎁 COMMUNITY           │
├──────────────────────────────┤
│                              │
│       COMMUNITY EVENT        │
│                              │
│  Pay ₹100 for a celebration  │
│                              │
│        - ₹100                │
│                              │
│       [ CONTINUE ]           │
└──────────────────────────────┘
```

Tasks should be loaded from game data.

---

# 20. Task Randomization

Chance and Community tasks should be randomly selected.

Example:

```js
const randomTask =
  tasks[Math.floor(Math.random() * tasks.length)];
```

Do not select the same task repeatedly when avoidable.

Prefer maintaining a shuffled deck:

```js
const chanceDeck = shuffle(chanceTasks);
const communityDeck = shuffle(communityTasks);
```

Then consume cards sequentially.

---

# 21. Center Area States

The center can have different states.

### Normal

```text
GAME CENTER

Current Player:
🔵 Alex

Waiting for action...
```

### Chance

```text
❓ CHANCE

Current Task

Receive ₹2000

[ CONTINUE ]
```

### Community

```text
🎁 COMMUNITY

Current Task

Pay ₹100

[ CONTINUE ]
```

### Dice

```text
🎲 ROLLING

4 + 5 = 9
```

### Winner

```text
🏆 WINNER

🔵 Alex

Congratulations!

[ PLAY AGAIN ]
```

---

# 22. Corner Design

Corner spaces should be significantly larger and visually distinctive.

## Start

Bottom-left:

```text
┌───────────────────────┐
│                       │
│          🚩           │
│                       │
│         START         │
│                       │
│       + ₹2000          │
│                       │
└───────────────────────┘
```

---

## Jail

Bottom-right:

```text
┌───────────────────────┐
│                       │
│       img bg          │
│                       │
│          JAIL         │
│                       │
│                       │
└───────────────────────┘
```

---

## Club

Top-right:

```text
┌───────────────────────┐
│                       │
│          img bg       │
│                       │
│          CLUB         │
│                       │
│                       │
└───────────────────────┘
```

---

## Resthouse

Top-left:

```text
┌───────────────────────┐
│                       │
│       img bg          │
│                       │
│       RESTHOUSE       │
│                       │
│                       │
└───────────────────────┘
```

Icons can be replaced with a professional icon library.

---

# 23. Dice UI

The dice should be visually prominent.

Place the dice near the current player/action area.

Example:

```text
       ┌──────┐   ┌──────┐
       │  ●   │   │ ● ●  │
       │      │   │  ●   │
       │   ●  │   │ ● ●  │
       └──────┘   └──────┘

           TOTAL: 8

       [ ROLL DICE ]
```

Dice should have:

* 3D/shadow effect
* Roll animation
* Clear result
* Disabled state during animation

---

# 24. Player Tokens

Players should be represented by tokens on the board.

Example:

```text
🔴
🔵
🟢
🟡
```

Tokens must:

* Be clearly visible
* Have a border
* Have a shadow
* Animate during movement
* Support multiple players in one cell

When multiple players occupy one property:

```text
┌─────────────┐
│ PROPERTY    │
│             │
│   🔴 🔵     │
│   🟢        │
└─────────────┘
```

---

# 25. Board Responsiveness

This is a critical requirement.

The board must maintain:

```css
aspect-ratio: 1 / 1;
```

Recommended:

```css
.board-wrapper {
  width: min(92vw, 1000px);
  aspect-ratio: 1;
  margin: auto;
}

.board {
  width: 100%;
  height: 100%;
}
```

---

# 26. Mobile Board

On mobile:

```text
┌──────────────────────────┐
│ REST │ P │ P │ P │ CLUB  │
│──────┘   │   │   └───────│
│ P        │   │        P   │
│ P        │   │        P   │
│ P        │   │        P   │
│ START    │   │       JAIL │
└──────────────────────────┘
```

The board must fit within approximately:

```text
90vw - 95vw
```

Do not allow the page to horizontally scroll just because of the board.

---

# 27. Mobile Information Strategy

Because property cells become small on mobile:

### Always show

* Property name
* Group color
* Price
* Player token

### Show on tap

* Large image
* Full property name
* Description
* Buying price
* Rent
* Owner
* Additional information

Use a bottom sheet or modal.

---

# 28. Property Details Modal

Clicking/tapping a property opens:

```text
┌─────────────────────────────┐
│                        ✕    │
│                             │
│       [ PROPERTY IMAGE ]    │
│                             │
│       GUJARAT               │
│                             │
│       🔴 RED GROUP          │
│                             │
│       BUY PRICE             │
│       ₹500                  │
│                             │
│       RENT                  │
│       ₹50                   │
│                             │
│       [ BUY PROPERTY ]      │
│                             │
└─────────────────────────────┘
```

---

# 29. Game Header

Desktop:

```text
┌─────────────────────────────────────────────────────┐
│ 🎲 GAME NAME       🔵 Alex's Turn      💰 ₹1,500    │
└─────────────────────────────────────────────────────┘
```

Mobile:

```text
┌──────────────────────────────┐
│ 🎲 GAME       💰 ₹1,500      │
│ 🔵 Alex's Turn               │
└──────────────────────────────┘
```

---

# 30. Action Controls

Primary controls:

* Roll Dice
* Buy
* Pay
* Continue
* Trade
* View Property
* End Turn

Only show actions that are valid for the current game state.

Example:

```text
Current player lands on property

[ BUY PROPERTY ]
[ VIEW DETAILS ]
```

If the property is already owned:

```text
[ PAY RENT ]
[ VIEW PROPERTY ]
```

---

# 31. Visual Hierarchy

The UI should prioritize:

```text
1. Current Turn
2. Board
3. Player Position
4. Available Action
5. Money
6. Property Information
7. Game History
```

The user should immediately understand:

**Where am I?**

**Whose turn is it?**

**Where did I land?**

**What can I do?**

**How much money do I have?**

---

# 32. Recommended Page Layout

## Desktop

```text
4 player
┌─────────────────────────────────────────────────────────┐
│                      HEADER                             │
├───────────────┬───────────────────────────┬─────────────┤
│               │                           │             │
│   PLAYERS     │                           │   ACTIONS   │
│               │         BOARD             │             │
│   🔴 Alex     │                           │   🎲 Dice   │
│   💰 ₹1200    │                           │             │
│               │                           │   Buy       │
│   🔵 Sam      │                           │             │
│   💰 ₹900     │                           │   Trade     │
│               │                           │             │
├───────────────┴───────────────────────────┴─────────────┤
│                      GAME LOG                            │
└─────────────────────────────────────────────────────────┘
```

---

# 33. Mobile Layout

```text
┌──────────────────────────┐
│         HEADER           │
├──────────────────────────┤
│      CURRENT PLAYER      │
├──────────────────────────┤
│                          │
│          BOARD           │
│                          │
├──────────────────────────┤
│      DICE / ACTION       │
├──────────────────────────┤
│   PLAYERS / GAME LOG     │
└──────────────────────────┘
```

---

# 34. Color System

Base UI:

```css
:root {
  --background: #F5F7FA;
  --surface: #FFFFFF;
  --text-primary: #172033;
  --text-secondary: #667085;

  --red: #E53935;
  --yellow: #FBC02D;
  --blue: #1E88E5;
  --green: #43A047;

  --border: #E4E7EC;

  --shadow:
    0 8px 24px rgba(0, 0, 0, 0.08);
}
```

Use a light background around the board so the board itself becomes the visual focus.

---

# 35. Typography

Use a modern rounded/clean font.

Recommended:

* Inter
* Nunito
* Poppins
* Manrope

Use:

```text
Property Name → Bold
Price → Extra Bold
Description → Regular
Buttons → Semi Bold
Game Status → Bold
```

---

# 36. Animation

Add animations for:

### Dice

```text
Roll → shake → reveal
```

### Player

```text
Cell 1 → Cell 2 → Cell 3 → destination
```

### Property

When purchased:

```text
property → highlight → owner indicator appears
```

### Task

Chance/Community:

```text
card → flip → task appears
```

Animations should be short and should not block interaction unnecessarily.

---


