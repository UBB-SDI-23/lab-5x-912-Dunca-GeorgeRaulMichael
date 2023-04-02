import { Owners } from "./Owners";
import { Toys } from "./Toys";

export interface Dogs{
    id?: number;
    name: string;
    breed: string;
    colour: string;
    is_healthy: boolean;
    date_of_birth: string;
    toys?: Toys[];
    owners?: Owners[];
    avg_price?:number;

}