import {
    getPokemonAbility,
    getPokemonDetail,
    getPokemonEggGroup,
    getPokemonGeneration,
    getPokemonGrowthRate,
    getPokemonSpecies,
    getPokemonType
} from "../services/fetchPokemon.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../contexts/language.ts";
import {IPokemon, IPokemonAbility, IPokemonSpecies} from "../ts/interface/pokemons.interfaces.ts";
import {lastIdState} from "../contexts/lastId.ts";

export function useFetch() {
    const language = useRecoilValue(languageState);
    const lastId = useRecoilValue(lastIdState);

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
        if (Number(data) < 1) return "";

        try {
            const res = await getPokemonSpecies(data);
            if (res && res.names) {
                const result = res.names?.find((item) => item.language.name === language)?.name || "";
                return result;
            }
            return "";
        } catch (e) {
            console.error(e);
        }
    }

    const findNameList = async (data: string) => {
        if (!data) return;

        try {
            const regex = new RegExp(data, "gi");
            const result = await Promise.all(
                Array.from({length: lastId}, async (_, i) => {
                    const name = await findName(i + 1);
                    return name && name.match(regex) ? {id: i + 1, name: name} : null;
                })
            );

            return result.filter((item) => item !== null);
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
                const flavor_text = res.flavor_text_entries.findLast((entry: {
                    language: {
                        name: string;
                    };
                }) => entry.language.name === language);
                const name = res.names.find((item: {
                    language: {
                        name: string;
                    };
                }) => item.language.name === language);

                return {flavor_text, name};
            });

            return await Promise.all(promises);
        } catch (e) {
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
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    const findExp = async (data: IPokemon) => {
        try {
            const res = await getPokemonGrowthRate(data.url.split("/")[6]);
            return res.levels.pop().experience;
        } catch (e) {
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
            return [];
        }
    }

    const findMatchType = async (data: string[] | number[]) => {
        try {
            if (data.length === 1) {
                const res = await getPokemonType(data[0]);
                return res.pokemon.filter((item) => Number(item.pokemon.url.split("/")[6]) <= lastId)
                    .map((item) => item.pokemon);
            } else if (data.length >= 2) {
                const [res1, res2] = await Promise.all([getPokemonType(data[0]), getPokemonType(data[1])]);
                const intersection = res1.pokemon.filter((v1) => res2.pokemon.find((v2) => v1.pokemon.name === v2.pokemon.name));

                return intersection.map((item) => item.pokemon);
            }

            return [];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    const findMatchRegion = async (data: string) => {
        try {
            if (data) {
                const res = await getPokemonGeneration(data);
                return res.pokemon_species;
            }
            return [];
        } catch (e) {
            return [];
        }
    }

    return {
        findName,
        findArtwork,
        findTypes,
        findId,
        findFlavorTexts,
        findGenus,
        findAbilities,
        findEggGroups,
        findExp,
        findNameList,
        findMatchType,
        findMatchRegion
    }
}