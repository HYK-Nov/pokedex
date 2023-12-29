import {lazy, useEffect, useState} from 'react';
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll.ts";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import {Loader, Stack} from "@mantine/core";
import {useQuery} from "@apollo/client";
import {GET_SCROLL_CONTENTS} from "../../services/queryPokemon.ts";
import {IPokemonList} from "../../ts/interface/pokemons.interfaces.ts";
import LoadingSkeleton from "../../components/common/LoadingSkeleton.tsx";
import {languageState} from "../../contexts/language.ts";

const PokemonList = lazy(() => import("../../components/common/PokemonList.tsx"));

const PAGE_SIZE = 16;

function Main() {
    const lastId = useRecoilValue(lastIdState);
    const language = useRecoilValue(languageState);
    const [scrolling, setScrolling] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [lastPage, setLastPage] = useState(0);
    const [listData, setListData] = useState<IPokemonList>({pokemon: []});

    const {data, fetchMore, refetch} = useQuery<IPokemonList>(GET_SCROLL_CONTENTS, {
        variables: {
            lastPage: 1,
            nexPage: 16,
            lan: language,
        }
    })

    useEffect(() => {
        const lastSpecyId = data?.pokemon[data?.pokemon.length - 1].id;
        setLastPage(lastSpecyId!);

        setListData(prev => ({pokemon: [...(prev.pokemon || []), ...(data?.pokemon || [])]}))
        setShowSkeleton(false);
    }, [data]);

    useEffect(() => {
        refetch();
        setListData({pokemon:[]});
        setLastPage(0);
    }, [language]);

    const ref = useInfiniteScroll(async (entry, observer) => {
        observer.unobserve(entry.target);
        if (!scrolling && entry.isIntersecting && lastPage + PAGE_SIZE <= lastId) {
            try {
                setScrolling(true);
                await fetchMore({
                    variables: {
                        lastPage: lastPage,
                        nextPage: lastPage + PAGE_SIZE,
                    },
                    updateQuery: (_prev, {fetchMoreResult}) => {
                        return fetchMoreResult;
                    }
                });
            } catch (error) {
                console.error(error);
            } finally {
                setScrolling(false);
            }
        }
    });

    return (
        <>
            {showSkeleton && <LoadingSkeleton/>}
            <Stack gap={"1.5rem"} align={"center"}>
                <PokemonList data={listData!}/>
                {scrolling && <Loader/>}
            </Stack>
            <div ref={ref} style={{height: "1px"}}/>
        </>
    );
}

export default Main;