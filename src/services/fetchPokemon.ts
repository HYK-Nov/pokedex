import axios from "axios";
import {IPokemonDetail, IPokemonSpecies, IPokemonTypeDetail} from "../ts/interface/pokemons.interfaces.ts";

const api = "https://pokeapi.co/api";

export const getPokemonDetail = async (data: string | number): Promise<IPokemonDetail> => {
    return await axios({
        baseURL: `${api}/v2/pokemon/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonSpecies = async (data: string | number): Promise<IPokemonSpecies> => {
    return await axios({
        baseURL: `${api}/v2/pokemon-species/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonList = async (offset: number) => {
    return await axios({
        baseURL: `${api}/v2/pokemon/?limit=30&offset=${offset}/`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonAbility = async (data: string | number) => {
    return await axios({
        baseURL: `${api}/v2/ability/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonEggGroup = async (data: string | number) => {
    return await axios({
        baseURL: `${api}/v2/egg-group/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonGrowthRate = async (data: string | number) => {
    return await axios({
        baseURL: `${api}/v2/growth-rate/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonType = async (data: string | number): Promise<IPokemonTypeDetail> => {
    return await axios({
        baseURL: `${api}/v2/type/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}