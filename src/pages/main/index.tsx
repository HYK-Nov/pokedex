import {useEffect, useState} from 'react';
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import {getPokemonList} from "../../services/fetchPokemon.ts";
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll.ts";
import PokemonList from "./components/PokemonList.tsx";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import {Loader, Stack} from "@mantine/core";

function Main() {
    const lastId = useRecoilValue(lastIdState);
    const [offset, setOffset] = useState(0);
    const [DATA, setDATA] = useState<IPokemon[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const ref = useInfiniteScroll(async (entry, observer) => {
        observer.unobserve(entry.target);
        if (!loading && hasNextPage) {
            try {
                setLoading(true);
                const res = await getPokemonList(offset);

                setDATA(prev => [...prev, ...res.results]);
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
    })

    useEffect(() => {
        getPokemonList(0)
            .then(res => {
                if (res.next) {
                    setHasNextPage(true);
                    setOffset(prev => prev + 30);
                }
                setDATA(res.results);
            });
    }, []);

    return (
        <Stack gap={"1.5rem"} align={"center"}>
            <PokemonList data={DATA}/>
            {loading && <Loader/>}
            <div ref={ref} style={{height: "1px"}}/>
        </Stack>
    );
}

export default Main;