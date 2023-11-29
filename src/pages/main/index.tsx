import {useEffect, useState} from 'react';
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import {getPokemonList} from "../../services/fetchPokemon.ts";
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll.ts";
import PokemonList from "./components/PokemonList.tsx";
import {useRecoilState, useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import {Loader, Stack} from "@mantine/core";
import {loadingState} from "../../contexts/loading.ts";

function Main() {
    const lastId = useRecoilValue(lastIdState);
    const [_, setLoadingOverlay] = useRecoilState(loadingState);
    const [data, setData] = useState<IPokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const ref = useInfiniteScroll(async (entry, observer) => {
        observer.unobserve(entry.target);
        if (!loading && hasNextPage && entry.isIntersecting) {
            try {
                setLoading(true);
                const res = await getPokemonList(offset);

                setData(prev => [...prev, ...res.results]);
                if (!res.next || offset >= lastId) {
                    setHasNextPage(false);
                } else {
                    setOffset(prev => prev + 30);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        setLoadingOverlay(true);
        getPokemonList(0)
            .then(res => {
                if (res.next) {
                    setHasNextPage(true);
                    setOffset(prev => prev + 30);
                }
                setData(res.results);
            })
            .finally(() => setTimeout(() => setLoadingOverlay(false), 1000));
    }, []);

    return (
        <Stack gap={"1.5rem"} align={"center"}>
            <PokemonList data={data}/>
            {loading && <Loader/>}
            {data && <div ref={ref} style={{height: "1px"}}/>}
        </Stack>
    );
}

export default Main;