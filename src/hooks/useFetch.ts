import {
    getPokemonAbility,
    getPokemonDetail,
    getPokemonEggGroup,
    getPokemonGrowthRate,
    getPokemonSpecies
} from "../services/fetchPokemon.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../contexts/language.ts";
import {IPokemon, IPokemonAbility, IPokemonSpecies} from "../ts/interface/pokemons.interfaces.ts";

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

    const findGenus = async (data: IPokemonSpecies) => {
        return data.genera.find((item) => item.language.name === language)?.genus;
    }

    const findAbilities = async (data: IPokemonAbility[]) => {
        try {
            const promises = data.map(async (item) => {
                const res = await getPokemonAbility(item.ability.url.split("/")[6]);
                const flavor_text = res.flavor_text_entries.findLast((entry: { language: { name: string; }; }) => entry.language.name === language);
                const name = res.names.find((item: { language: { name: string; }; }) => item.language.name === language);

                return {flavor_text, name};
            });

            return await Promise.all(promises);
        }catch (e) {
            console.error(e);
            return [];
        }
    }

    const findEggGroups = async (data: IPokemon[]) => {
        try {
            const promises = data.map(async (item) => {
                const res = await getPokemonEggGroup(item.url.split("/")[6]);
                const egg_group = [...res.names].find(item => item.language.name === language).name;

                return egg_group;
            });

            return await Promise.all(promises);
        }catch (e) {
            console.error(e);
            return [];
        }
    }

    const findExp = async (data: IPokemon) => {
        try {
            const res = await getPokemonGrowthRate(data.url.split("/")[6]);
            return res.levels.pop().experience;
        }catch (e) {
            console.error(e);
        }
    }

    const findFlavorTexts = async (data: IPokemonSpecies) => {
        try {
            return data.flavor_text_entries.filter((item) => item.language.name === language);
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

    return {findName, findArtwork, findTypes, findId, findFlavorTexts, findGenus, findAbilities, findEggGroups, findExp}
}