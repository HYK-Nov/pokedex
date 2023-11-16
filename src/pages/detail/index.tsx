import {useLoaderData} from "react-router-dom";
import {IPokemonDetail, IPokemonSpecies} from "../../ts/interface/pokemons.interfaces.ts";
import {useEffect, useState} from "react";
import {findSprite} from "../../hooks/useFetch.ts";

interface ILoaderData {
    DETAIL: IPokemonDetail,
    SPECIES: IPokemonSpecies,
}

function Detail() {
    const {DETAIL, SPECIES} = useLoaderData() as ILoaderData;
    const ID = DETAIL.id;
    const [sprite, setSprite] = useState("");

    useEffect(() => {
        setSprite(findSprite(ID));
    }, []);

    return (
        <>
            <img src={sprite}/>
        </>
    );
}

export default Detail;