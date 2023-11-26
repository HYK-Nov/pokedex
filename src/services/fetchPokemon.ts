import axios from "axios";
import {IPokemonDetail, IPokemonSpecies, IPokemonTypeDetail} from "../ts/interface/pokemons.interfaces.ts";

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

export const getPokemonAbility = async (data: string | number) => {
    return await axios.get(`https://pokeapi.co/api/v2/ability/${data}`)
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonEggGroup = async (data: string | number) => {
    return await axios.get(`https://pokeapi.co/api/v2/egg-group/${data}`)
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonGrowthRate = async (data: string | number) => {
    return await axios.get(`https://pokeapi.co/api/v2/growth-rate/${data}`)
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonType = async (data: string | number):Promise<IPokemonTypeDetail> => {
    return await axios.get(`https://pokeapi.co/api/v2/type/${data}`)
        .then(res => res.data)
        .catch(e => console.error(e));
}