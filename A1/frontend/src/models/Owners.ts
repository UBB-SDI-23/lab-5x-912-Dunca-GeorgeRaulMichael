import { DogOwners } from "./DogOwner";
import { Dogs } from "./Dogs";

export interface Owners
{
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    city: string;
    date_of_birth: string;
    nr_of_dogs?: number;
    dogs?: DogOwners[];
}