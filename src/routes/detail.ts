import {getPokemonDetail, getPokemonSpecies} from "../services/fetchPokemon.ts";
import {IPokemonDetail, IPokemonSpecies} from "../ts/interface/pokemons.interfaces.ts";

interface ILoaderParams {
    pokemonId: string | number;
}

interface ILoaderResult {
    DETAIL: IPokemonDetail;
    SPECIES: IPokemonSpecies;
}

type TLoaderFunction<T = any> = (args: { params: T }) => Promise<ILoaderResult>;

export const loader: TLoaderFunction = async ({params}: { params: ILoaderParams }) => {
    const [DETAIL, SPECIES] = await Promise.all([
        getPokemonDetail(params.pokemonId),
        getPokemonSpecies(params.pokemonId),
    ]);
    return {DETAIL, SPECIES};
}