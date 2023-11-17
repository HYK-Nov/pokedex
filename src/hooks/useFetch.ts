import {getPokemonDetail, getPokemonSpecies} from "../services/fetchPokemon.ts";
import {Await} from "react-router-dom";

export const findId = async (data: string | number) => {
    try {
        const res = await getPokemonDetail(data);
        return res.species.url.split("/").slice(6, 7)[0];
    } catch (e) {
        console.error(e);
    }
}

export const findSprite = (data: string | number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data}.png`;
}

export const findKoName = async (data: string | number) => {
    try {
        const res = await getPokemonSpecies(data);
        return res.names.find((item) => item.language.name === "ko" || item.language.name === "en")?.name;
    } catch (e) {
        console.error(e);
    }
}

export const findTypes = async (data: string | number) => {
    try {
        const res = await getPokemonDetail(data);
        return res.types;
    } catch (e) {
        console.error(e);
    }
}