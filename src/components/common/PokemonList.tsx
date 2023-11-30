import {useMemo} from "react";
import {SimpleGrid} from "@mantine/core";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import PokemonBtn from "../../pages/main/components/PokemonBtn.tsx";

function PokemonList({data}: { data: IPokemon[] }) {
    const items = useMemo(() => {
        if (!data || data.length === 0) {
            return null;
        }

        return data.map((item, idx) => (
            <PokemonBtn key={idx} data={item}/>
        ));
    }, [data]);

    return (
        <SimpleGrid cols={{base: 1, sm: 3, md: 4}}>
            {items}
        </SimpleGrid>
    );
}

export default PokemonList;