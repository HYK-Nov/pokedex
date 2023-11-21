import {IPokemonFlavorText} from "./pokemons.interfaces.ts";

export interface IDetailAbilities {
    flavor_text: IPokemonFlavorText;
    name: {
        language: string;
        name: string;
    };
}