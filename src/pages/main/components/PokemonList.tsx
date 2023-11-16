import {useMemo} from "react";
import {SimpleGrid} from "@mantine/core";
import {IPokemon} from "../../../ts/interface/pokemons.interfaces.ts";
import PokemonBtn from "./PokemonBtn.tsx";

function PokemonList({data}: { data: IPokemon[] }) {

    const items = useMemo(() =>
        data.map((item, idx) => {
            return (
                <PokemonBtn key={idx} data={item}/>
            )
        }), [data]);

    return (
        <SimpleGrid cols={5}>
            {items}
        </SimpleGrid>
    );
}

export default PokemonList;