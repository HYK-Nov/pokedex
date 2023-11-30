import {useEffect, useState} from 'react';
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import {getPokemonList} from "../../services/fetchPokemon.ts";
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll.ts";
import PokemonList from "../../components/common/PokemonList.tsx";
import {useRecoilState, useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import {Loader, Stack} from "@mantine/core";
import {loadingState} from "../../contexts/loading.ts";
import LoadingSkeleton from "../../components/common/LoadingSkeleton.tsx";

function Main() {
    const lastId = useRecoilValue(lastIdState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [data, setData] = useState<IPokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    const ref = useInfiniteScroll(async (entry, observer) => {
        observer.unobserve(entry.target);
        if (!scrolling && hasNextPage && entry.isIntersecting) {
            try {
                setScrolling(true);
                const res = await getPokemonList(offset);

                setData(prev => [...prev, ...res.results]);
                if (!res.next || offset >= lastId) {
                    setHasNextPage(false);
                } else {
                    setOffset(prev => prev + 24);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setScrolling(false);
            }
        }
    });

    useEffect(() => {
        setLoading(true);
        try {
            getPokemonList(0)
                .then(res => {
                    if (res.next) {
                        setHasNextPage(true);
                        setOffset(prev => prev + 24);
                    }
                    setData(res.results);
                })
        } finally {
            setTimeout(() => setLoading(false), 1300);
        }
    }, []);

    return (
        <>
            {loading && <LoadingSkeleton/>}

            <Stack gap={"1.5rem"} align={"center"}>
                {!loading && <PokemonList data={data}/>}
                {scrolling && <Loader/>}
                {(!loading && data.length > 0) && <div ref={ref} style={{height: "1px"}}/>}
            </Stack>
        </>
    );
}

export default Main;