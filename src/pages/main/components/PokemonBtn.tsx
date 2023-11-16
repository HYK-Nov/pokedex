import {useEffect, useState} from "react";
import {Badge, Paper, SimpleGrid, Stack, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {IPokemon, IPokemonType} from "../../../ts/interface/pokemons.interfaces.ts";
import {TYPE_COLORS, TYPE_KO} from "../../../ts/types/pokemons.types.ts";
import {findKoName, findSprite, findTypes} from "../../../hooks/useFetch.ts";

function PokemonBtn({data}: { data: IPokemon }) {
    const pokeNum = data.url.split("/")[6];
    const [pokeName, setPokeName] = useState("");
    const [pokeSprite, setPokeSprite] = useState("");
    const [pokeTypes, setPokeTypes] = useState<IPokemonType[]>([]);

    useEffect(() => {
        findKoName(pokeNum)
            .then(res => res === undefined ? setPokeName(data.name) : setPokeName(res!));
        setPokeSprite(findSprite(pokeNum));
        findTypes(pokeNum)
            .then(res => setPokeTypes(res!));
    }, [data]);

    return (
        <Link to={`/pokemon/${pokeNum}`}>
            <Paper shadow={"xs"} p={"md"} style={{height: "100%"}}>
                <Stack>
                    <Stack gap={"0.3rem"}>
                        <Title size={"0.75rem"} style={{color: "gray"}}>No. {pokeNum}</Title>
                        <Title order={4}>{pokeName}</Title>
                    </Stack>
                    {pokeSprite && <img src={pokeSprite} alt={data.name}/>}
                    {pokeTypes[0] &&
                        <SimpleGrid cols={2}>
                            <Badge color={TYPE_COLORS[pokeTypes[0].type?.name]}
                                   radius={"sm"}
                                   fullWidth={true}>
                                {TYPE_KO[pokeTypes[0].type.name]}
                            </Badge>
                            {pokeTypes.length > 1 &&
                                <Badge color={TYPE_COLORS[pokeTypes[1].type?.name]}
                                       radius={"sm"}
                                       fullWidth={true}>
                                    {TYPE_KO[pokeTypes[1].type.name]}
                                </Badge>}
                        </SimpleGrid>
                    }
                </Stack>
            </Paper>
        </Link>
    );
}

export default PokemonBtn;