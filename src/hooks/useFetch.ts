import {getPokemonDetail, getPokemonSpecies} from "../services/fetchPokemon.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../contexts/language.ts";

export function useFetch() {
    const language = useRecoilValue(languageState);

    const findId = async (data: string | number) => {
        try {
            const res = await getPokemonDetail(data);
            return res.species.url.split("/").slice(6, 7)[0];
        } catch (e) {
            console.error(e);
        }
    }

    const findSprite = (data: string | number) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data}.png`;
    }

    const findArtwork = (data: string | number) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data}.png`;
    }

    const findName = async (data: string | number) => {
        try {
            const res = await getPokemonSpecies(data);
            return res.names.find((item) => item.language.name === language)?.name;
        } catch (e) {
            console.error(e);
        }
    }

    const findTypes = async (data: string | number) => {
        try {
            const res = await getPokemonDetail(data);
            return res.types;
        } catch (e) {
            console.error(e);
        }
    }

    return {findName, findSprite, findArtwork, findTypes, findId}
}