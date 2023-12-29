import {useMemo} from "react";
import {SimpleGrid} from "@mantine/core";
import {IPokemon, IPokemonList} from "../../ts/interface/pokemons.interfaces.ts";
import PokemonBtn from "./PokemonBtn.tsx";

function PokemonList({data}: { data: IPokemonList }) {
    const items = useMemo(() => {
        if (!data || data.pokemon.length === 0) {
            return null;
        }

        return data.pokemon.map((item, idx) => (
            <PokemonBtn key={idx} data={item}/>
        ));
    }, [data]);

    return (
        <SimpleGrid cols={{base: 1, sm: 2, md: 3, lg: 4}}
                    spacing={{base: "1.5rem"}}
                    verticalSpacing={{base: "1.5rem"}}
                    style={{width: "100%"}}>
            {items}
        </SimpleGrid>
    );
}

export default PokemonList;