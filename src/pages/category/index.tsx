import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import PokemonList from "../main/components/PokemonList.tsx";

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
        if (types.length === 1){
            findMatchType(types[0])
                .then(res => setData(res));
        }
    }, [types]);

    return (
        <>
            {data.length > 0 && <PokemonList data={data}/>}
        </>
    );
}

export default Category;