import {useEffect, useState} from "react";
import {Badge, Image, Paper, SimpleGrid, Stack, Title, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {IPokemon, IPokemonType} from "../../../ts/interface/pokemons.interfaces.ts";
import {TYPE_COLORS, TYPE_KO} from "../../../ts/types/pokemons.types.ts";
import {useFetch} from "../../../hooks/useFetch.ts";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../../contexts/lastId.ts";

function PokemonBtn({data}: { data: IPokemon }) {
    const navigate = useNavigate();
    const id = data.url.split("/")[6];
    const lasId = useRecoilValue(lastIdState);
    const [name, setName] = useState("");
    const [artwork, setArtwork] = useState("");
    const [types, setTypes] = useState<IPokemonType[]>([]);

    const {findArtwork, findName, findTypes} = useFetch();
    useEffect(() => {
        findName(id!)
            .then(res => setName(res!));
        findTypes(id!)
            .then(res => setTypes(res!));
        setArtwork(findArtwork(id!));
    }, [data]);

    return (
        <>
            {(Number(id) <= lasId) &&
                <UnstyledButton onClick={() => navigate(`pokemon/${id}`)}>
                    <Paper shadow={"xs"} p={"md"} style={{height: "100%"}}>
                        <Stack gap={"1.5rem"}>
                            <Stack gap={"0.3rem"}>
                                <Title size={"0.75rem"} style={{color: "gray"}}>No. {id}</Title>
                                <Title order={4}>{name}</Title>
                            </Stack>
                            {artwork && <Image src={artwork} alt={data.name}
                                               fallbackSrc={"https://placehold.co/300x300?text=Image"}/>}
                            {types[0] &&
                                <SimpleGrid cols={2}>
                                    <Badge color={TYPE_COLORS[types[0].type?.name]}
                                           fullWidth={true}
                                           onClick={(e) => {
                                               e.stopPropagation();
                                               navigate(`type/${types[0].type.name}`);
                                           }}>
                                        {TYPE_KO[types[0].type.name]}
                                    </Badge>
                                    {types.length > 1 &&
                                        <Badge color={TYPE_COLORS[types[1].type?.name]}
                                               fullWidth={true}
                                               onClick={(e) => {
                                                   e.stopPropagation();
                                                   navigate(`type/${types[1].type.name}`);
                                               }}>
                                            {TYPE_KO[types[1].type.name]}
                                        </Badge>}
                                </SimpleGrid>
                            }
                        </Stack>
                    </Paper>
                </UnstyledButton>
            }
        </>
    );
}

export default PokemonBtn;