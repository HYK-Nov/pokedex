import {useSearchParams} from "react-router-dom";
import {useEffect, useLayoutEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import PokemonList from "../main/components/PokemonList.tsx";
import {useSetRecoilState} from "recoil";
import {loadingState} from "../../contexts/loading.ts";

function Category() {
    const setLoadingOverlay = useSetRecoilState(loadingState);
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
                })
                .finally(() => setTimeout(() => setLoadingOverlay(false), 1000));
        } else if (types.length === 2) {
            Promise.all([findMatchType(types[0]), findMatchType(types[1])])
                .then(([res1, res2]) => {
                    const intersection = res1.filter((v1) => res2.find((v2) => v1.name === v2.name));
                    setData(intersection);
                })
                .finally(() => setTimeout(() => setLoadingOverlay(false), 1000));
        }
    }, [types]);

    useLayoutEffect(() => {
        setLoadingOverlay(true);
    }, [])

    return (
        <>
            {data.length > 0 && <PokemonList data={data}/>}
        </>
    );
}

export default Category;