import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import PokemonList from "../main/components/PokemonList.tsx";
import TypeBtn from "../../components/common/TypeBtn.tsx";
import {Box, SimpleGrid} from "@mantine/core";

const TYPE = ["normal", "fire", "water", "grass", "flying",
    "fighting", "poison", "electric", "ground", "rock",
    "psychic", "ice", "bug", "ghost", "steel",
    "dragon", "dark", "fairy"];

function Category() {
    const [searchParams] = useSearchParams();
    const [types, setTypes] = useState<string[]>([]);
    const [data, setData] = useState<IPokemon[]>([]);

    const {findMatchType} = useFetch();
    useEffect(() => {
        if (searchParams.size > 0) {
            const newTypes = searchParams.get("type")!.split(",") || [];
            setTypes([...new Set(newTypes)]);
        }
    }, [searchParams]);

    useEffect(() => {
        if (types.length === 1) {
            findMatchType(types[0])
                .then(res => {
                    if (res.length === 0) {
                        throw Error;
                    }
                    setData(res);
                });
        } else if (types.length === 2) {
            Promise.all([findMatchType(types[0]), findMatchType(types[1])])
                .then(([res1, res2]) => {
                    const intersection = res1.filter((v1) => res2.find((v2) => v1.name === v2.name));
                    setData(intersection);
                });
        }
    }, [types]);

    const typeItems = TYPE.map((item) => (
        <TypeBtn type={item} disabled={!types.includes(item)}/>
    ));

    return (
        <>
            <Box bg={"white"}>
                <SimpleGrid cols={{base: 3, sm: 5}} mb={"2rem"}>
                    {typeItems}
                </SimpleGrid>
            </Box>
            {data.length > 0 && <PokemonList data={data}/>}
        </>
    );
}

export default Category;