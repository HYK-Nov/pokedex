import {getPokemonDetail} from "../services/fetchPokemon.ts";

interface ILoaderParams {
    pokemonId: string | number;
}

export const loader = ({params}: { params: ILoaderParams }) => {
    return getPokemonDetail(params.pokemonId);
}