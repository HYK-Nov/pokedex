import {useState} from 'react';
import {getPokemonList} from "../../services/fetchPokemon.ts";
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll.ts";
import PokemonList from "../../components/common/PokemonList.tsx";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import {Loader, Stack} from "@mantine/core";
import LoadingSkeleton from "../../components/common/LoadingSkeleton.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";

function Main() {
    const lastId = useRecoilValue(lastIdState);
    const [scrolling, setScrolling] = useState(false);

    const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['scroll'],
        queryFn: ({pageParam}) => getPokemonList(pageParam),
        getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
            return (lastPageParam + 24) <= lastId ? lastPageParam + 24 : undefined;
        },
        initialPageParam: 0,
        select: result => result.pages.map(item => item.results).flat()
    })

    const ref = useInfiniteScroll(async (entry, observer) => {
        observer.unobserve(entry.target);
        if (!scrolling && hasNextPage && entry.isIntersecting) {
            try {
                setScrolling(true);
                await fetchNextPage();
            } catch (error) {
                console.error(error);
            } finally {
                setScrolling(false);
            }
        }
    });

    return (
        <>
            {isLoading && <LoadingSkeleton/>}

            <Stack gap={"1.5rem"} align={"center"}>
                {!isLoading && <PokemonList data={data!}/>}
                {scrolling && <Loader/>}
                {!isLoading && <div ref={ref} style={{height: "1px"}}/>}
            </Stack>
        </>
    );
}

export default Main;