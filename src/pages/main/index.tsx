import {useEffect, useState} from 'react';
import {Container} from "@mantine/core";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import {getPokemonList} from "../../services/fetchPokemon.ts";
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll.ts";
import PokemonList from "./components/PokemonList.tsx";

function Main() {
    const [offset, setOffset] = useState(0);
    const [DATA, setDATA] = useState<IPokemon[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const ref = useInfiniteScroll(async (entry, observer) => {
        observer.unobserve(entry.target);
        if (!loading && hasNextPage) {
            setLoading(true);
            getPokemonList(offset)
                .then(res => {
                    setDATA(prev => [...prev, ...res.results]);
                    (!res.next) ?
                        setHasNextPage(false) :
                        setOffset(prev => prev + 30);
                })
                .finally(() => setLoading(false));
        }
    })

    useEffect(() => {
        getPokemonList(offset)
            .then(res => {
                if (res.next) {
                    setHasNextPage(true);
                    setOffset(prev => prev + 30);
                }
                setDATA(res.results);
            });
    }, []);

    return (
        <Container>
            <PokemonList data={DATA}/>
            <div ref={ref} style={{height:"1px"}}/>
        </Container>
    );
}

export default Main;