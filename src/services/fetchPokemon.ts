import axios from "axios";
import {
    IPokemonDetail, IPokemonGeneration, IPokemonPokedex,
    IPokemonRegion,
    IPokemonSpecies,
    IPokemonTypeDetail
} from "../ts/interface/pokemons.interfaces.ts";

const api = "https://pokeapi.co/api/v2";

export const getPokemonDetail = async (data: string | number): Promise<IPokemonDetail> => {
    return await axios({
        baseURL: `${api}/pokemon/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonSpecies = async (data: string | number): Promise<IPokemonSpecies> => {
    return await axios({
        baseURL: `${api}/pokemon-species/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonList = async (offset: number) => {
    return await axios({
        baseURL: `${api}/pokemon/?limit=24&offset=${offset}/`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonAbility = async (data: string | number) => {
    return await axios({
        baseURL: `${api}/ability/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonEggGroup = async (data: string | number) => {
    return await axios({
        baseURL: `${api}/egg-group/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonGrowthRate = async (data: string | number) => {
    return await axios({
        baseURL: `${api}/growth-rate/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonType = async (data: string | number): Promise<IPokemonTypeDetail> => {
    return await axios({
        baseURL: `${api}/type/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonRegion = async (data: string | number): Promise<IPokemonRegion> => {
    return await axios({
        baseURL: `${api}/region/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonGeneration = async (data: string | number): Promise<IPokemonGeneration> => {
    return await axios({
        baseURL: `${api}/generation/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}

export const getPokemonPokedex = async (data: string | number): Promise<IPokemonPokedex> => {
    return await axios({
        baseURL: `${api}/pokedex/${data}`,
        method: "GET",
        responseType: "json",
    })
        .then(res => res.data)
        .catch(e => console.error(e));
}