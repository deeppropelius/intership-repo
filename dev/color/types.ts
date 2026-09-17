export type SpaceType = 'property' | 'white' | 'corner' | 'chance' | 'community';
export type ColorGroup = 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'special';

export interface BoardSpace {
    id: number | string;
    spaceIndex: number;
    type: SpaceType;
    group?: ColorGroup;
    name: string;
    subtitle?: string;
    image?: string;
    buyingPrice?: number;
    sellingPrice?: number;
    houseUpgrade?: number;
    hotelUpgrade?: number;
    rent?: {
        base: number;
        house1: number;
        house2: number;
        house3: number;
        hotel: number;
    };
    description?: string;
    ownerId?: number | null;
    houses?: number;
    hasHotel?: boolean;
    mortgaged?: boolean;
}

export interface Player {
    id: number;
    name: string;
    money: number;
    color: string;
    tokenEmoji: string;
    position: number;
    inJail: boolean;
    jailTurns: number;
    properties: (number | string)[];
}

export interface TaskCard {
    id: string;
    type: 'chance' | 'community';
    title: string;
    description: string;
    actionType: 'money' | 'move' | 'jail' | 'reward';
    value: number; // positive = gain, negative = pay, or space target
    image?: string;
}
