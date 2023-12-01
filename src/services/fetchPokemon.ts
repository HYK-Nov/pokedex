import axios from "axios";
import {
    IPokemonDetail, IPokemonGeneration, IPokemonPokedex,
    IPokemonRegion,
    IPokemonSpecies,
    IPokemonTypeDetail
} from "../ts/interface/pokemons.interfaces.ts";

const getApi = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    method: "GET",
    responseType: "json",
})

export const getPokemonDetail = async (data: string | number): Promise<IPokemonDetail> => {
    return await getApi.get(`/pokemon/${data}`)
        .then(res => res.data);
}

export const getPokemonSpecies = async (data: string | number): Promise<IPokemonSpecies> => {
    return await getApi.get(`/pokemon-species/${data}`)
        .then(res => res.data);
}

export const getPokemonList = async (offset: number) => {
    return await getApi.get(`/pokemon/?limit=24&offset=${offset}`)
        .then(res => res.data);
}

export const getPokemonAbility = async (data: string | number) => {
    return await getApi.get(`/ability/${data}`)
        .then(res => res.data);
}

export const getPokemonEggGroup = async (data: string | number) => {
    return await getApi.get(`/egg-group/${data}`)
        .then(res => res.data);
}

export const getPokemonGrowthRate = async (data: string | number) => {
    return await getApi.get(`/growth-rate/${data}`)
        .then(res => res.data);
}

export const getPokemonType = async (data: string | number): Promise<IPokemonTypeDetail> => {
    return await getApi.get(`/type/${data}`)
        .then(res => res.data);
}

export const getPokemonRegion = async (data: string | number): Promise<IPokemonRegion> => {
    return await getApi.get(`/region/${data}`)
        .then(res => res.data);
}

export const getPokemonGeneration = async (data: string | number): Promise<IPokemonGeneration> => {
    return await getApi.get(`/generation/${data}`)
        .then(res => res.data);
}

export const getPokemonPokedex = async (data: string | number): Promise<IPokemonPokedex> => {
    return await getApi.get(`/pokedex/${data}`)
        .then(res => res.data);
}