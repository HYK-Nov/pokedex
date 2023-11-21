import {useEffect, useState} from "react";
import {Image, Paper, Stack, Title, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {IPokemon, IPokemonType} from "../../../ts/interface/pokemons.interfaces.ts";
import {useFetch} from "../../../hooks/useFetch.ts";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../../contexts/lastId.ts";
import TypeBtn from "../../../components/common/TypeBtn.tsx";

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
                <UnstyledButton onClick={() => navigate(`/${id}`)}>
                    <Paper shadow={"xs"} p={"md"} style={{height: "100%"}}>
                        <Stack gap={"1.5rem"}>
                            <Stack gap={"0.3rem"}>
                                <Title size={"0.75rem"} style={{color: "gray"}}>No. {id}</Title>
                                <Title order={4}>{name}</Title>
                            </Stack>
                            {artwork && <Image src={artwork} alt={data.name}
                                               fallbackSrc={`https://placehold.co/300x300?text=${data.name}`}/>}
                            {types[0] && <TypeBtn types={types}/>}
                        </Stack>
                    </Paper>
                </UnstyledButton>
            }
        </>
    );
}

export default PokemonBtn;