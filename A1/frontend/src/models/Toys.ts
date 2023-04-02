import { Dogs } from "./Dogs";

export interface Toys
{
    id: number;
    number: string;
    dog: Dogs;
    material: string;
    colour: string;
    price: number;
    
}