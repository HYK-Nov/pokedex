import {useLoaderData} from "react-router-dom";
import {IPokemonDetail, IPokemonSpecies} from "../../ts/interface/pokemons.interfaces.ts";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {Title} from "@mantine/core";

function Detail() {
    const detail = useLoaderData() as IPokemonDetail;
    const id = detail.species.url.split("/").slice(6, 7).pop();
    const [sprite, setSprite] = useState("");
    const [name, setName] = useState("");
    const [species, setSpecies] = useState<IPokemonSpecies>();

    const {findName, findSprite} = useFetch();
    useEffect(() => {
        setSprite(findSprite(id!));
        findName(id!)
            .then(res => setName(res!));
    }, []);

    return (
        <>
            <Title>{name}</Title>
            <img src={sprite}/>
        </>
    );
}

export default Detail;