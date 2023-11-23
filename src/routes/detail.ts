import {getPokemonDetail, getPokemonSpecies} from "../services/fetchPokemon.ts";
import {IPokemonDetail, IPokemonSpecies} from "../ts/interface/pokemons.interfaces.ts";
import {LoaderFunction} from "react-router-dom";

interface ILoaderParams {
    pokemonId: string | number;
}

interface ILoaderResult {
    detail: IPokemonDetail;
    species: IPokemonSpecies;
}

export const loader:LoaderFunction<{params:ILoaderParams}> = async ({params}): Promise<ILoaderResult> => {
    const [detail, species] = await Promise.all([
        getPokemonDetail(params.pokemonId!),
        getPokemonSpecies(params.pokemonId!)
    ]);
    return {detail, species};
}