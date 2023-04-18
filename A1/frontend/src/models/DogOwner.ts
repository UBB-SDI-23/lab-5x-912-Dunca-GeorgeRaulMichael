import { Dogs } from "./Dogs";
import { Owners } from "./Owners";

export interface DogOwners
{
    id?:number,
    dog:Dogs,
    owner: Owners,
    adoption_date: string,
    adoption_fee: number,
}