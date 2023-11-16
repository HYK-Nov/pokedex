import axios from "axios";
import {IPokemonDetail, IPokemonSpecies} from "../ts/interface/pokemons.interfaces.ts";

export const getPokemonDetail = async (data: string | number): Promise<IPokemonDetail> => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${data}`)
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonSpecies = async (data: string | number): Promise<IPokemonSpecies> => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${data}`)
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonList = async (offset: number) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${offset}/`)
        .then(res => res.data)
        .catch(e => console.error(e));
}