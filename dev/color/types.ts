import { properties } from "./data/Properties.js";

export interface Property {
    id: number;
    name: string;
    image : string;

    buyingPrice: number;
    sellingPrice: number;
    houseUpgrade:number;
    hotelUpgrade:number;

    rent: {
        base: number;
        house1: number;
        house2: number;
        house3: number;
        hotel: number;
    };

}
export interface PropertyState{
    PropertyId:number;
    ownerId: number | null;
    houses: number;
    hasHotel: boolean;
    mortgaged: boolean;
}
export interface Player{
    id:number;
    name : string;
    Money:number;
}

