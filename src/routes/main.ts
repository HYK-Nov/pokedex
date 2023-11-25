import {getPokemonList} from "../services/fetchPokemon.ts";

export const loader = () => {
    return getPokemonList(0).then(res => res.results);
}