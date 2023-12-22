import {SimpleGrid} from "@mantine/core";
import {IPokemonType} from "../../ts/interface/pokemons.interfaces.ts";
import TypeBtn from "./TypeBtn.tsx";
import React from "react";
import {useNavigate} from "react-router-dom";

function TypeSetBtn({types}: { types: IPokemonType[] }) {
    const navigate = useNavigate();

    const handleOnClick = (event: React.MouseEvent, type: string) => {
        event.stopPropagation();
        navigate(`/category?type=${type}`);
    }

    return (
        <SimpleGrid cols={2}>
            <TypeBtn id={types[0].type?.id}
                     type={types[0].type?.name}
                     onClick={(e) => handleOnClick(e!, types[0].type?.name)}/>
            {types.length > 1 &&
                <TypeBtn id={types[1].type?.id}
                         type={types[1].type?.name}
                         onClick={(e) => handleOnClick(e!, types[1].type?.name)}/>}
        </SimpleGrid>
    );
}

export default TypeSetBtn;