// Configurable Game Rules (High-Roller Economy)
export const gameConfig = {
    startingMoney: 50000,
    startReward: 5000,
    diceCount: 2,
    maxPlayers: 4,
    allowPropertySelling: true,
    completeGroupBonus: true,
    bankruptcyEnabled: true
};
// 20 Colored State Properties with authentic image paths (Scaled High-Roller Economy)
export const coloredProperties = [
    // RED GROUP
    {
        id: 1,
        type: "property",
        group: "red",
        name: "Darjeeling",
        image: "./assets/Darjeeling.jpg",
        buyingPrice: 1500,
        sellingPrice: 1125,
        houseUpgrade: 750,
        hotelUpgrade: 1500,
        rent: { base: 150, house1: 300, house2: 600, house3: 1000, hotel: 1800 },
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
        buyingPrice: 2000,
        sellingPrice: 1500,
        houseUpgrade: 1000,
        hotelUpgrade: 2000,
        rent: { base: 200, house1: 400, house2: 800, house3: 1300, hotel: 2400 },
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
        buyingPrice: 2500,
        sellingPrice: 1875,
        houseUpgrade: 1250,
        hotelUpgrade: 2500,
        rent: { base: 250, house1: 500, house2: 1000, house3: 1600, hotel: 3000 },
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
        buyingPrice: 3000,
        sellingPrice: 2250,
        houseUpgrade: 1500,
        hotelUpgrade: 3000,
        rent: { base: 300, house1: 600, house2: 1200, house3: 1900, hotel: 3600 },
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
        buyingPrice: 3500,
        sellingPrice: 2625,
        houseUpgrade: 1750,
        hotelUpgrade: 3500,
        rent: { base: 350, house1: 700, house2: 1400, house3: 2200, hotel: 4200 },
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
        buyingPrice: 4500,
        sellingPrice: 3375,
        houseUpgrade: 2250,
        hotelUpgrade: 4500,
        rent: { base: 450, house1: 900, house2: 1800, house3: 2800, hotel: 5400 },
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
        buyingPrice: 5500,
        sellingPrice: 4125,
        houseUpgrade: 2750,
        hotelUpgrade: 5500,
        rent: { base: 550, house1: 1100, house2: 2200, house3: 3400, hotel: 6600 },
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
        buyingPrice: 6500,
        sellingPrice: 4875,
        houseUpgrade: 3250,
        hotelUpgrade: 6500,
        rent: { base: 650, house1: 1300, house2: 2600, house3: 4000, hotel: 7800 },
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
        buyingPrice: 7500,
        sellingPrice: 5625,
        houseUpgrade: 3750,
        hotelUpgrade: 7500,
        rent: { base: 750, house1: 1500, house2: 3000, house3: 4600, hotel: 9000 },
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
        buyingPrice: 8500,
        sellingPrice: 6375,
        houseUpgrade: 4250,
        hotelUpgrade: 8500,
        rent: { base: 850, house1: 1700, house2: 3400, house3: 5200, hotel: 10200 },
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
        buyingPrice: 10000,
        sellingPrice: 7500,
        houseUpgrade: 5000,
        hotelUpgrade: 10000,
        rent: { base: 1000, house1: 2000, house2: 4000, house3: 6000, hotel: 12000 },
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
        buyingPrice: 11000,
        sellingPrice: 8250,
        houseUpgrade: 5500,
        hotelUpgrade: 11000,
        rent: { base: 1100, house1: 2200, house2: 4400, house3: 6600, hotel: 13200 },
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
        buyingPrice: 12500,
        sellingPrice: 9375,
        houseUpgrade: 6250,
        hotelUpgrade: 12500,
        rent: { base: 1250, house1: 2500, house2: 5000, house3: 7500, hotel: 15000 },
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
        buyingPrice: 14000,
        sellingPrice: 10500,
        houseUpgrade: 7000,
        hotelUpgrade: 14000,
        rent: { base: 1400, house1: 2800, house2: 5600, house3: 8400, hotel: 17000 },
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
        buyingPrice: 16000,
        sellingPrice: 12000,
        houseUpgrade: 8000,
        hotelUpgrade: 16000,
        rent: { base: 1600, house1: 3200, house2: 6400, house3: 9600, hotel: 19500 },
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
        buyingPrice: 18000,
        sellingPrice: 13500,
        houseUpgrade: 9000,
        hotelUpgrade: 18000,
        rent: { base: 1800, house1: 3600, house2: 7200, house3: 11000, hotel: 22000 },
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
        buyingPrice: 20000,
        sellingPrice: 15000,
        houseUpgrade: 10000,
        hotelUpgrade: 20000,
        rent: { base: 2000, house1: 4000, house2: 8000, house3: 12000, hotel: 24000 },
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
        buyingPrice: 23000,
        sellingPrice: 17250,
        houseUpgrade: 11500,
        hotelUpgrade: 23000,
        rent: { base: 2300, house1: 4600, house2: 9200, house3: 14000, hotel: 28000 },
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
        buyingPrice: 26000,
        sellingPrice: 19500,
        houseUpgrade: 13000,
        hotelUpgrade: 26000,
        rent: { base: 2600, house1: 5200, house2: 10400, house3: 16000, hotel: 32000 },
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
        buyingPrice: 30000,
        sellingPrice: 22500,
        houseUpgrade: 15000,
        hotelUpgrade: 30000,
        rent: { base: 3000, house1: 6000, house2: 12000, house3: 18000, hotel: 36000 },
        description: "God's Own Country, lush backwaters, emerald palms, and Ayurveda.",
        ownerId: null,
        houses: 0,
        hasHotel: false,
        mortgaged: false
    }
];
// 6 White / Transport Properties (No Houses — Rent Multiplies with Each Additional Ticket Owned)
export const whiteProperties = [
    {
        id: "w1",
        type: "white",
        group: "white",
        name: "Indian Railways",
        image: "./assets/railways.jpg",
        buyingPrice: 7500,
        sellingPrice: 5625,
        rent: { base: 750, house1: 1500, house2: 3000, house3: 4500, hotel: 6000 },
        description: "Lifeline of the nation. Owning multiple transport tickets doubles and scales rent across all tickets!",
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
        buyingPrice: 9000,
        sellingPrice: 6750,
        rent: { base: 900, house1: 1800, house2: 3600, house3: 5400, hotel: 7200 },
        description: "Flagship global aviation network. Rent doubles when you also own Railways or other transport tickets!",
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
        buyingPrice: 7500,
        sellingPrice: 5625,
        rent: { base: 750, house1: 1500, house2: 3000, house3: 4500, hotel: 6000 },
        description: "High-speed urban mass transit. Network synergy doubles rent when combined with airlines or railways.",
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
        buyingPrice: 7500,
        sellingPrice: 5625,
        rent: { base: 750, house1: 1500, house2: 3000, house3: 4500, hotel: 6000 },
        description: "National expressway network connecting states. Multi-modal transport doubles rental yields!",
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
        buyingPrice: 9000,
        sellingPrice: 6750,
        rent: { base: 900, house1: 1800, house2: 3600, house3: 5400, hotel: 7200 },
        description: "Domestic passenger aviation. Connects with rail and highway tickets to deliver multiplied rent.",
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
        buyingPrice: 8000,
        sellingPrice: 6000,
        rent: { base: 800, house1: 1600, house2: 3200, house3: 4800, hotel: 6400 },
        description: "Maritime international cargo trade routes. Transport empire multiplier doubles rent upon acquiring partner tickets.",
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
        image: "./assets/Darjeeling.jpg",
        subtitle: "Collect ₹5,000",
        description: "Collect ₹5,000 salary whenever you land on or pass Start!"
    },
    resthouse: {
        id: "corner-resthouse",
        type: "corner",
        group: "special",
        name: "RESTHOUSE",
        image: "./assets/Goa.jpg",
        subtitle: "Free Rest",
        description: "Relax at the luxury resthouse. No rent, peaceful stop."
    },
    club: {
        id: "corner-club",
        type: "corner",
        group: "special",
        name: "CLUB",
        image: "./assets/Mumbai.jpg",
        subtitle: "VIP Networking",
        description: "Welcome to the exclusive Business Club. Enjoy high-stakes interactions!"
    },
    jail: {
        id: "corner-jail",
        type: "corner",
        group: "special",
        name: "JAIL",
        image: "./assets/Delhi.jpg",
        subtitle: "Just Visiting",
        description: "Don't break the trade laws! If sent here, pay fine or wait turns."
    }
};
// Chance & Community Cards Deck (Scaled Values)
export const chanceTasks = [
    {
        id: "ch-1",
        type: "chance",
        title: "Lucky Investment Return",
        description: "Your tech startup stock surged in the market! Collect ₹3,500 from the bank.",
        actionType: "money",
        value: 3500,
        image: "./assets/chance.jpg"
    },
    {
        id: "ch-2",
        type: "chance",
        title: "Speeding Ticket on Highway",
        description: "Caught overspeeding on the expressway. Pay ₹1,500 fine to the bank.",
        actionType: "money",
        value: -1500,
        image: "./assets/chance.jpg"
    },
    {
        id: "ch-3",
        type: "chance",
        title: "Advance to START",
        description: "Express helicopter ride to START! Collect ₹5,000 bonus salary immediately.",
        actionType: "move",
        value: 0,
        image: "./assets/chance.jpg"
    },
    {
        id: "ch-4",
        type: "chance",
        title: "Tourism Promotion Award",
        description: "Your state development project won a national tourism award! Collect ₹2,500.",
        actionType: "money",
        value: 2500,
        image: "./assets/chance.jpg"
    },
    {
        id: "ch-5",
        type: "chance",
        title: "Luxury Tax Audit",
        description: "Tax audit discovered luxury property renovation expenses. Pay ₹2,000.",
        actionType: "money",
        value: -2000,
        image: "./assets/chance.jpg"
    }
];
export const communityTasks = [
    {
        id: "com-1",
        type: "community",
        title: "Festival Celebration Sponsor",
        description: "Sponsored the grand local cultural festival. Pay ₹1,500 for city fireworks.",
        actionType: "money",
        value: -1500,
        image: "./assets/community.jpg"
    },
    {
        id: "com-2",
        type: "community",
        title: "Heritage Restoration Grant",
        description: "Received a state heritage conservation bonus grant! Collect ₹3,000.",
        actionType: "money",
        value: 3000,
        image: "./assets/community.jpg"
    },
    {
        id: "com-3",
        type: "community",
        title: "Bank Dividend Payout",
        description: "Annual bank stock dividend credited to your account. Collect ₹2,000.",
        actionType: "money",
        value: 2000,
        image: "./assets/community.jpg"
    },
    {
        id: "com-4",
        type: "community",
        title: "City Road Repair Contribution",
        description: "Contribute to building eco-friendly green roads. Pay ₹1,800.",
        actionType: "money",
        value: -1800,
        image: "./assets/community.jpg"
    },
    {
        id: "com-5",
        type: "community",
        title: "Charity Gala Raffle",
        description: "You won 1st prize in the annual city charity gala! Collect ₹2,500.",
        actionType: "money",
        value: 2500,
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
