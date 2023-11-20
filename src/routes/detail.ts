import {getPokemonDetail, getPokemonSpecies} from "../services/fetchPokemon.ts";

interface ILoaderParams {
    pokemonId: string | number;
}

export const loader = async ({params}: { params: ILoaderParams }) => {
    const [detail, species] = await Promise.all([
        getPokemonDetail(params.pokemonId),
        getPokemonSpecies(params.pokemonId)
    ]);
    return {detail, species};
}