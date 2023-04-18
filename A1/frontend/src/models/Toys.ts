import { Dogs } from "./Dogs";

export interface Toys
{
    id?: number;
    name: string;
    dog: Dogs;
    material: string;
    colour: string;
    price: number;
    descriptions: string;
    
}