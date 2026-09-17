// Configurable Game Rules (as defined in rule.md)
export const gameConfig = {
    startingMoney: 15000,
    startReward: 2000,
    diceCount: 2,
    maxPlayers: 4,
    allowPropertySelling: true,
    completeGroupBonus: true,
    bankruptcyEnabled: true
};
// 20 Colored State Properties with authentic image paths
export const coloredProperties = [
    // RED GROUP
    {
        id: 1,
        type: "property",
        group: "red",
        name: "Darjeeling",
        image: "./assets/Darjeeling.jpg",
        buyingPrice: 500,
        sellingPrice: 375,
        houseUpgrade: 250,
        hotelUpgrade: 500,
        rent: { base: 50, house1: 100, house2: 150, house3: 200, hotel: 300 },
        description: "Queen of the Hills, aromatic world-famous tea gardens and Himalayan railway.",
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
        description: "Spiritual sanctuary of Punjab, home to the resplendent Golden Temple.",
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
        description: "Picturesque Himalayan capital with pine forests and Mall Road promenade.",
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
        description: "Royal city of grand illuminated palaces, sandalwood heritage, and silk.",
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
        description: "The magnificent Pink City with iconic Hawa Mahal and Amber Fort.",
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
        description: "Historic city housing the marble wonder of the world — the Taj Mahal.",
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
        description: "One of the oldest living cities with illuminated Ganga Aarti ghats.",
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
        description: "Lotus city celebrated for towering gopurams of Meenakshi Temple.",
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
        description: "UNESCO Sun Temple monument sculpted as a giant stone chariot of the Sun.",
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
        description: "City of Joy with grand Howrah Bridge, colonial arts, and sweets.",
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
        description: "Heaven on earth with shikara boats gliding across serene Dal Lake.",
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
        description: "Himalayan gem framed by Mt. Kanchenjunga and monasteries.",
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
        description: "UNESCO World Heritage city, textile hub, and historic Sabarmati Ashram.",
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
        description: "Financial capital and City of Dreams, Marine Drive, and Gateway of India.",
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
        description: "Sun-drenched coastal paradise, sandy beaches, and vibrant resorts.",
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
        description: "Monumental stone chariot ruins of the Vijayanagara Empire.",
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
        description: "Southern cultural metropolis boasting Marina Beach and classical music.",
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
        description: "City of Pearls and Cyber Towers, Charminar, and Golconda Fort.",
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
        description: "National Capital Territory rich with Red Fort, India Gate, and commerce.",
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
        description: "God's Own Country, lush backwaters, emerald palms, and Ayurveda.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    }
];
// 6 White / Transport / Utility Properties with images
export const whiteProperties = [
    {
        id: "w1",
        type: "white",
        group: "white",
        name: "Indian Railways",
        image: "./assets/railways.jpg",
        buyingPrice: 2000,
        sellingPrice: 1500,
        rent: { base: 200, house1: 400, house2: 800, house3: 1200, hotel: 1600 },
        description: "Lifeline of the nation, connecting millions across thousands of stations.",
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
        description: "Flagship global aviation network linking Indian cities to world hubs.",
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
        description: "High-speed urban mass rapid transit network powering modern cities.",
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
        description: "Maritime trade network linking major commercial ports and sea routes.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    }
];
// 4 Fixed Corners
export const cornerSpaces = {
    start: {
        id: "corner-start",
        type: "corner",
        group: "special",
        name: "START",
        image: "./assets/darjeeling.jpg",
        subtitle: "Collect ₹2,000",
        description: "Collect ₹2,000 salary whenever you land on or pass Start!"
    },
    resthouse: {
        id: "corner-resthouse",
        type: "corner",
        group: "special",
        name: "RESTHOUSE",
        image: "./assets/goa.jpg",
        subtitle: "Free Resort & Rest",
        description: "Relax at the luxury resthouse. No rent, peaceful stop."
    },
    club: {
        id: "corner-club",
        type: "corner",
        group: "special",
        name: "CLUB",
        image: "./assets/mumbai.jpg",
        subtitle: "VIP Networking",
        description: "Welcome to the exclusive Business Club. Enjoy high-stakes interactions!"
    },
    jail: {
        id: "corner-jail",
        type: "corner",
        group: "special",
        name: "JAIL",
        image: "./assets/delhi.jpg",
        subtitle: "Just Visiting",
        description: "Don't break the trade laws! If sent here, pay fine or wait turns."
    }
};
// Chance & Community Cards Deck
export const chanceTasks = [
    {
        id: "ch-1",
        type: "chance",
        title: "Lucky Investment Return",
        description: "Your tech startup stock surged in the market! Collect ₹1,500 from the bank.",
        actionType: "money",
        value: 1500,
        image: "./assets/chance.jpg"
    },
    {
        id: "ch-2",
        type: "chance",
        title: "Speeding Ticket on Highway",
        description: "Caught overspeeding on the expressway. Pay ₹500 fine to the bank.",
        actionType: "money",
        value: -500,
        image: "./assets/chance.jpg"
    },
    {
        id: "ch-3",
        type: "chance",
        title: "Advance to START",
        description: "Express helicopter ride to START! Collect ₹2,000 bonus salary immediately.",
        actionType: "move",
        value: 0,
        image: "./assets/chance.jpg"
    },
    {
        id: "ch-4",
        type: "chance",
        title: "Tourism Promotion Award",
        description: "Your state development project won a national tourism award! Collect ₹1,000.",
        actionType: "money",
        value: 1000,
        image: "./assets/chance.jpg"
    },
    {
        id: "ch-5",
        type: "chance",
        title: "Luxury Tax Audit",
        description: "Tax audit discovered luxury property renovation expenses. Pay ₹800.",
        actionType: "money",
        value: -800,
        image: "./assets/chance.jpg"
    }
];
export const communityTasks = [
    {
        id: "com-1",
        type: "community",
        title: "Festival Celebration Sponsor",
        description: "Sponsored the grand local cultural festival. Pay ₹400 for city fireworks.",
        actionType: "money",
        value: -400,
        image: "./assets/community.jpg"
    },
    {
        id: "com-2",
        type: "community",
        title: "Heritage Restoration Grant",
        description: "Received a state heritage conservation bonus grant! Collect ₹1,200.",
        actionType: "money",
        value: 1200,
        image: "./assets/community.jpg"
    },
    {
        id: "com-3",
        type: "community",
        title: "Bank Dividend Payout",
        description: "Annual bank stock dividend credited to your account. Collect ₹800.",
        actionType: "money",
        value: 800,
        image: "./assets/community.jpg"
    },
    {
        id: "com-4",
        type: "community",
        title: "City Road Repair Contribution",
        description: "Contribute to building eco-friendly green roads. Pay ₹600.",
        actionType: "money",
        value: -600,
        image: "./assets/community.jpg"
    },
    {
        id: "com-5",
        type: "community",
        title: "Charity Gala Raffle",
        description: "You won 1st prize in the annual city charity gala! Collect ₹1,000.",
        actionType: "money",
        value: 1000,
        image: "./assets/community.jpg"
    }
];
// Helper to build the standard 36-space board
export function createBoardSpaces(randomizeProperties = false) {
    const board = new Array(36);
    board[0] = { ...cornerSpaces.start, spaceIndex: 0 };
    board[9] = { ...cornerSpaces.resthouse, spaceIndex: 9 };
    board[18] = { ...cornerSpaces.club, spaceIndex: 18 };
    board[27] = { ...cornerSpaces.jail, spaceIndex: 27 };
    let middlePool = [
        ...coloredProperties,
        ...whiteProperties,
        {
            id: "chance-1",
            type: "chance",
            group: "special",
            name: "CHANCE",
            image: "./assets/chance.jpg",
            subtitle: "Try Your Luck",
            description: "Draw a lucky Chance card from the center deck!"
        },
        {
            id: "chance-2",
            type: "chance",
            group: "special",
            name: "CHANCE",
            image: "./assets/chance.jpg",
            subtitle: "Try Your Luck",
            description: "Draw a lucky Chance card from the center deck!"
        },
        {
            id: "chance-3",
            type: "chance",
            group: "special",
            name: "CHANCE",
            image: "./assets/chance.jpg",
            subtitle: "Try Your Luck",
            description: "Draw a lucky Chance card from the center deck!"
        },
        {
            id: "community-1",
            type: "community",
            group: "special",
            name: "COMMUNITY",
            image: "./assets/community.jpg",
            subtitle: "Chest & Perks",
            description: "Draw a Community chest task card!"
        },
        {
            id: "community-2",
            type: "community",
            group: "special",
            name: "COMMUNITY",
            image: "./assets/community.jpg",
            subtitle: "Chest & Perks",
            description: "Draw a Community chest task card!"
        },
        {
            id: "community-3",
            type: "community",
            group: "special",
            name: "COMMUNITY",
            image: "./assets/community.jpg",
            subtitle: "Chest & Perks",
            description: "Draw a Community chest task card!"
        }
    ];
    if (randomizeProperties) {
        for (let i = middlePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [middlePool[i], middlePool[j]] = [middlePool[j], middlePool[i]];
        }
    }
    let poolIndex = 0;
    for (let i = 0; i < 36; i++) {
        if (i === 0 || i === 9 || i === 18 || i === 27)
            continue;
        board[i] = {
            ...middlePool[poolIndex],
            spaceIndex: i
        };
        poolIndex++;
    }
    return board;
}
