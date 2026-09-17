import type { BoardSpace, TaskCard } from "../types.js";

// 20 Colored State Properties (4 groups x 5 properties)
export const coloredProperties: Omit<BoardSpace, "spaceIndex">[] = [
    // RED GROUP
    {
        id: 1,
        type: "property",
        group: "red",
        name: "Darjeeling",
        image: "./assets/Darjeeling.jpg",
        buyingPrice: 500,
        sellingPrice: 400,
        houseUpgrade: 250,
        hotelUpgrade: 500,
        rent: { base: 50, house1: 100, house2: 150, house3: 200, hotel: 300 },
        description: "Queen of the Hills, famed for aromatic tea gardens and Himalayan toy train views.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 2,
        type: "property",
        group: "red",
        name: "Amritsar",
        image: "./assets/Amritsar.jpg",
        buyingPrice: 700,
        sellingPrice: 525,
        houseUpgrade: 350,
        hotelUpgrade: 700,
        rent: { base: 70, house1: 140, house2: 210, house3: 280, hotel: 420 },
        description: "Spiritual heart of Punjab, home to the glorious Golden Temple and rich culinary heritage.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 3,
        type: "property",
        group: "red",
        name: "Shimla",
        image: "./assets/Shimla.jpg",
        buyingPrice: 900,
        sellingPrice: 675,
        houseUpgrade: 450,
        hotelUpgrade: 900,
        rent: { base: 90, house1: 180, house2: 270, house3: 360, hotel: 540 },
        description: "Charming colonial hill station surrounded by pine forests and snow-capped peaks.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 4,
        type: "property",
        group: "red",
        name: "Mysuru",
        image: "./assets/Mysuru.jpg",
        buyingPrice: 1100,
        sellingPrice: 825,
        houseUpgrade: 550,
        hotelUpgrade: 1100,
        rent: { base: 110, house1: 220, house2: 330, house3: 440, hotel: 660 },
        description: "City of Palaces, royal heritage, silk weaving, and sandalwood fragrance.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 5,
        type: "property",
        group: "red",
        name: "Jaipur",
        image: "./assets/Jaipur.jpg",
        buyingPrice: 1300,
        sellingPrice: 975,
        houseUpgrade: 650,
        hotelUpgrade: 1300,
        rent: { base: 130, house1: 260, house2: 390, house3: 520, hotel: 780 },
        description: "The magnificent Pink City with historic forts, grand courtyards, and vibrant bazaars.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },

    // YELLOW GROUP
    {
        id: 6,
        type: "property",
        group: "yellow",
        name: "Agra",
        image: "./assets/Agra.jpg",
        buyingPrice: 1500,
        sellingPrice: 1125,
        houseUpgrade: 750,
        hotelUpgrade: 1500,
        rent: { base: 150, house1: 300, house2: 450, house3: 600, hotel: 900 },
        description: "Home of the world wonder Taj Mahal and imperial Mughal architectural marvels.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 7,
        type: "property",
        group: "yellow",
        name: "Varanasi",
        image: "./assets/Varanasi.jpg",
        buyingPrice: 1800,
        sellingPrice: 1350,
        houseUpgrade: 900,
        hotelUpgrade: 1800,
        rent: { base: 180, house1: 360, house2: 540, house3: 720, hotel: 1080 },
        description: "One of the world's oldest living cities on the sacred banks of River Ganga.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 8,
        type: "property",
        group: "yellow",
        name: "Madurai",
        image: "./assets/Madurai.jpg",
        buyingPrice: 2100,
        sellingPrice: 1575,
        houseUpgrade: 1050,
        hotelUpgrade: 2100,
        rent: { base: 210, house1: 420, house2: 630, house3: 840, hotel: 1260 },
        description: "Cultural capital of Tamil Nadu, famous for the towering Meenakshi Amman Temple.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 9,
        type: "property",
        group: "yellow",
        name: "Konark",
        image: "./assets/Konark.jpg",
        buyingPrice: 2400,
        sellingPrice: 1800,
        houseUpgrade: 1200,
        hotelUpgrade: 2400,
        rent: { base: 240, house1: 480, house2: 720, house3: 960, hotel: 1440 },
        description: "Coastal treasure featuring the awe-inspiring 13th-century Sun Temple chariot.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 10,
        type: "property",
        group: "yellow",
        name: "Kolkata",
        image: "./assets/Kolkata.jpg",
        buyingPrice: 2700,
        sellingPrice: 2025,
        houseUpgrade: 1350,
        hotelUpgrade: 2700,
        rent: { base: 270, house1: 540, house2: 810, house3: 1080, hotel: 1620 },
        description: "City of Joy, known for literature, sweets, colonial landmarks, and Howrah Bridge.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },

    // BLUE GROUP
    {
        id: 11,
        type: "property",
        group: "blue",
        name: "Srinagar",
        image: "./assets/Srinagar.jpg",
        buyingPrice: 3000,
        sellingPrice: 2250,
        houseUpgrade: 1500,
        hotelUpgrade: 3000,
        rent: { base: 300, house1: 600, house2: 900, house3: 1200, hotel: 1800 },
        description: "Paradise on Earth with tranquil Dal Lake houseboats and Mughal gardens.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 12,
        type: "property",
        group: "blue",
        name: "Gangtok",
        image: "./assets/Gangtok.jpg",
        buyingPrice: 3300,
        sellingPrice: 2475,
        houseUpgrade: 1650,
        hotelUpgrade: 3300,
        rent: { base: 330, house1: 660, house2: 990, house3: 1320, hotel: 1980 },
        description: "Scenic Himalayan capital blessed with views of Mt. Kangchenjunga and monasteries.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 13,
        type: "property",
        group: "blue",
        name: "Ahmedabad",
        image: "./assets/Ahmedabad.jpg",
        buyingPrice: 3600,
        sellingPrice: 2700,
        houseUpgrade: 1800,
        hotelUpgrade: 3600,
        rent: { base: 360, house1: 720, house2: 1080, house3: 1440, hotel: 2160 },
        description: "First UNESCO World Heritage City in India, textile hub and Gandhi Ashram landmark.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 14,
        type: "property",
        group: "blue",
        name: "Mumbai",
        image: "./assets/Mumbai.jpg",
        buyingPrice: 4000,
        sellingPrice: 3000,
        houseUpgrade: 2000,
        hotelUpgrade: 4000,
        rent: { base: 400, house1: 800, house2: 1200, house3: 1600, hotel: 2400 },
        description: "Financial capital of India, city of dreams, Bollywood, and Marine Drive.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 15,
        type: "property",
        group: "blue",
        name: "Goa",
        image: "./assets/Goa.jpg",
        buyingPrice: 4500,
        sellingPrice: 3375,
        houseUpgrade: 2250,
        hotelUpgrade: 4500,
        rent: { base: 450, house1: 900, house2: 1350, house3: 1800, hotel: 2700 },
        description: "Sun-kissed beaches, vibrant nightlife, Portuguese heritage, and coastal serenity.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },

    // GREEN GROUP
    {
        id: 16,
        type: "property",
        group: "green",
        name: "Hampi",
        image: "./assets/Hampi.jpg",
        buyingPrice: 5000,
        sellingPrice: 3750,
        houseUpgrade: 2500,
        hotelUpgrade: 5000,
        rent: { base: 500, house1: 1000, house2: 1500, house3: 2000, hotel: 3000 },
        description: "Monumental ruins of the Vijayanagara Empire with stone chariots and boulder hills.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 17,
        type: "property",
        group: "green",
        name: "Chennai",
        image: "./assets/Chennai.jpg",
        buyingPrice: 6000,
        sellingPrice: 4500,
        houseUpgrade: 3000,
        hotelUpgrade: 6000,
        rent: { base: 600, house1: 1200, house2: 1800, house3: 2400, hotel: 3600 },
        description: "Gateway to South India, bustling metropolis with Marina Beach and Carnatic music.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 18,
        type: "property",
        group: "green",
        name: "Hyderabad",
        image: "./assets/Hyderabad.jpg",
        buyingPrice: 7000,
        sellingPrice: 5250,
        houseUpgrade: 3500,
        hotelUpgrade: 7000,
        rent: { base: 700, house1: 1400, house2: 2100, house3: 2800, hotel: 4200 },
        description: "City of Pearls & Cyberabad, iconic Charminar, Golconda Fort, and world-class IT.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 19,
        type: "property",
        group: "green",
        name: "Delhi",
        image: "./assets/Delhi.jpg",
        buyingPrice: 8500,
        sellingPrice: 6375,
        houseUpgrade: 4250,
        hotelUpgrade: 8500,
        rent: { base: 850, house1: 1700, house2: 2550, house3: 3400, hotel: 5100 },
        description: "National capital territory rich in historic monuments, power corridors, and culture.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: 20,
        type: "property",
        group: "green",
        name: "Kerala",
        image: "./assets/Kerala.jpg",
        buyingPrice: 10000,
        sellingPrice: 7500,
        houseUpgrade: 5000,
        hotelUpgrade: 10000,
        rent: { base: 1000, house1: 2000, house2: 3000, house3: 4000, hotel: 6000 },
        description: "God's Own Country, lush backwaters, palm groves, spice plantations, and Ayurveda.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    }
];

// 6 White / Transport / Utility Properties
export const whiteProperties: Omit<BoardSpace, "spaceIndex">[] = [
    {
        id: "w1",
        type: "white",
        group: "white",
        name: "Indian Railways",
        image: "./assets/railways.jpg",
        buyingPrice: 2000,
        sellingPrice: 1500,
        rent: { base: 200, house1: 400, house2: 800, house3: 1200, hotel: 1600 },
        description: "Lifeline of the nation, connecting thousands of stations across India.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: "w2",
        type: "white",
        group: "white",
        name: "Air India",
        image: "./assets/air_india.jpg",
        buyingPrice: 2500,
        sellingPrice: 1875,
        rent: { base: 250, house1: 500, house2: 1000, house3: 1500, hotel: 2000 },
        description: "Flagship international airline connecting Indian cities to world hubs.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: "w3",
        type: "white",
        group: "white",
        name: "Metro Transit",
        image: "./assets/metro.jpg",
        buyingPrice: 2000,
        sellingPrice: 1500,
        rent: { base: 200, house1: 400, house2: 800, house3: 1200, hotel: 1600 },
        description: "Modern rapid mass transit network powering urban mobility.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: "w4",
        type: "white",
        group: "white",
        name: "National Roadways",
        image: "./assets/roadways.jpg",
        buyingPrice: 2000,
        sellingPrice: 1500,
        rent: { base: 200, house1: 400, house2: 800, house3: 1200, hotel: 1600 },
        description: "National expressway network connecting industrial corridors and states.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: "w5",
        type: "white",
        group: "white",
        name: "Indian Airlines",
        image: "./assets/airlines.jpg",
        buyingPrice: 2500,
        sellingPrice: 1875,
        rent: { base: 250, house1: 500, house2: 1000, house3: 1500, hotel: 2000 },
        description: "Domestic passenger aviation network spanning across tier 1 & 2 cities.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    },
    {
        id: "w6",
        type: "white",
        group: "white",
        name: "Shipping Cargo",
        image: "./assets/shipping.jpg",
        buyingPrice: 2200,
        sellingPrice: 1650,
        rent: { base: 220, house1: 440, house2: 880, house3: 1320, hotel: 1800 },
        description: "Maritime trade network linking major ports and international maritime routes.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    }
];

// 4 Fixed Corners
export const cornerSpaces: Record<string, Omit<BoardSpace, "spaceIndex">> = {
    start: {
        id: "corner-start",
        type: "corner",
        group: "special",
        name: "START",
        subtitle: "Collect ₹2,000",
        description: "Collect ₹2,000 salary whenever you land on or pass Start!"
    },
    resthouse: {
        id: "corner-resthouse",
        type: "corner",
        group: "special",
        name: "RESTHOUSE",
        subtitle: "Free Resort & Rest",
        description: "Relax at the luxury resthouse. No rent, just serene peace."
    },
    club: {
        id: "corner-club",
        type: "corner",
        group: "special",
        name: "CLUB",
        subtitle: "VIP Networking",
        description: "Welcome to the exclusive Business Club. Enjoy high-stakes interactions!"
    },
    jail: {
        id: "corner-jail",
        type: "corner",
        group: "special",
        name: "JAIL",
        subtitle: "Just Visiting",
        description: "Don't break the trade laws! If sent here, pay fine or wait turns."
    }
};

// Chance & Community Cards Deck
export const chanceTasks: TaskCard[] = [
    {
        id: "ch-1",
        type: "chance",
        title: "Lucky Investment Return",
        description: "Your tech startup stock surged in the market! Collect ₹1,500 from the bank.",
        actionType: "money",
        value: 1500
    },
    {
        id: "ch-2",
        type: "chance",
        title: "Speeding Ticket on Highway",
        description: "Caught overspeeding on the expressway. Pay ₹500 fine to the bank.",
        actionType: "money",
        value: -500
    },
    {
        id: "ch-3",
        type: "chance",
        title: "Advance to START",
        description: "Express helicopter ride to START! Collect ₹2,000 bonus salary immediately.",
        actionType: "move",
        value: 0
    },
    {
        id: "ch-4",
        type: "chance",
        title: "Tourism Promotion Award",
        description: "Your state development project won a national tourism award! Collect ₹1,000.",
        actionType: "money",
        value: 1000
    },
    {
        id: "ch-5",
        type: "chance",
        title: "Luxury Tax Audit",
        description: "Tax audit discovered luxury property renovation expenses. Pay ₹800.",
        actionType: "money",
        value: -800
    }
];

export const communityTasks: TaskCard[] = [
    {
        id: "com-1",
        type: "community",
        title: "Festival Celebration Sponsor",
        description: "Sponsored the grand local cultural festival. Pay ₹400 for city fireworks.",
        actionType: "money",
        value: -400
    },
    {
        id: "com-2",
        type: "community",
        title: "Heritage Restoration Grant",
        description: "Received a state heritage conservation bonus grant! Collect ₹1,200.",
        actionType: "money",
        value: 1200
    },
    {
        id: "com-3",
        type: "community",
        title: "Bank Dividend Payout",
        description: "Annual bank stock dividend credited to your account. Collect ₹800.",
        actionType: "money",
        value: 800
    },
    {
        id: "com-4",
        type: "community",
        title: "City Road Repair Contribution",
        description: "Contribute to building eco-friendly green roads. Pay ₹600.",
        actionType: "money",
        value: -600
    },
    {
        id: "com-5",
        type: "community",
        title: "Charity Gala Raffle",
        description: "You won 1st prize in the annual city charity gala! Collect ₹1,000.",
        actionType: "money",
        value: 1000
    }
];

// Helper to build the standard 36-space board
export function createBoardSpaces(randomizeProperties: boolean = false): BoardSpace[] {
    const board: BoardSpace[] = new Array(36);

    // 4 corners: Space 0 (BL), Space 9 (TL), Space 18 (TR), Space 27 (BR)
    board[0] = { ...cornerSpaces.start, spaceIndex: 0 };
    board[9] = { ...cornerSpaces.resthouse, spaceIndex: 9 };
    board[18] = { ...cornerSpaces.club, spaceIndex: 18 };
    board[27] = { ...cornerSpaces.jail, spaceIndex: 27 };

    // 32 middle spaces: 20 colored + 6 white + 3 chance + 3 community
    let middlePool: Omit<BoardSpace, "spaceIndex">[] = [
        ...coloredProperties,
        ...whiteProperties,
        {
            id: "chance-1",
            type: "chance",
            group: "special",
            name: "CHANCE",
            subtitle: "Try Your Luck",
            image: "./assets/chance.jpg",
            description: "Draw a lucky Chance card from the center deck!"
        },
        {
            id: "chance-2",
            type: "chance",
            group: "special",
            name: "CHANCE",
            subtitle: "Try Your Luck",
            image: "./assets/chance.jpg",
            description: "Draw a lucky Chance card from the center deck!"
        },
        {
            id: "chance-3",
            type: "chance",
            group: "special",
            name: "CHANCE",
            subtitle: "Try Your Luck",
            image: "./assets/chance.jpg",
            description: "Draw a lucky Chance card from the center deck!"
        },
        {
            id: "community-1",
            type: "community",
            group: "special",
            name: "COMMUNITY",
            subtitle: "Chest & Perks",
            image: "./assets/community.jpg",
            description: "Draw a Community chest task card!"
        },
        {
            id: "community-2",
            type: "community",
            group: "special",
            name: "COMMUNITY",
            subtitle: "Chest & Perks",
            image: "./assets/community.jpg",
            description: "Draw a Community chest task card!"
        },
        {
            id: "community-3",
            type: "community",
            group: "special",
            name: "COMMUNITY",
            subtitle: "Chest & Perks",
            image: "./assets/community.jpg",
            description: "Draw a Community chest task card!"
        }
    ];

    if (randomizeProperties) {
        // Fisher-Yates shuffle
        for (let i = middlePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [middlePool[i], middlePool[j]] = [middlePool[j], middlePool[i]];
        }
    }

    // Place them into the 32 non-corner spaces
    let poolIndex = 0;
    for (let i = 0; i < 36; i++) {
        if (i === 0 || i === 9 || i === 18 || i === 27) continue;
        board[i] = {
            ...middlePool[poolIndex],
            spaceIndex: i
        };
        poolIndex++;
    }

    return board;
}

export const properties = coloredProperties;