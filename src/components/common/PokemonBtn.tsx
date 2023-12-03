import {Image, Paper, Stack, Title, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import {useFetch} from "../../hooks/useFetch.ts";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import TypeBtn from "./TypeSetBtn.tsx";
import {useQuery} from "@tanstack/react-query";
import {languageState} from "../../contexts/language.ts";
import {useEffect} from "react";

function PokemonBtn({data}: { data: IPokemon }) {
    const language = useRecoilValue(languageState);
    const navigate = useNavigate();
    const id = data.url.split("/")[6];
    const lasId = useRecoilValue(lastIdState);

    const {findArtwork, findName, findTypes} = useFetch();
    const {data: name, refetch: nameRefetch} = useQuery({
        queryKey: ['name', id],
        queryFn: () => findName(id),
        initialData: "",
    })
    const {data: types} = useQuery({
        queryKey: ['types', id],
        queryFn: () => findTypes(id),
        initialData: [],
    })
    const {data: artwork} = useQuery({
        queryKey: ['artwork', id],
        queryFn: () => findArtwork(id),
        initialData: "",
    })

    useEffect(() => {
        nameRefetch();
    }, [language]);

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
                            <Image src={artwork} alt={data.name}
                                   fallbackSrc={`https://placehold.co/100x100?text=${data.name}`}
                                   loading={"lazy"}
                                   style={{width: "60%", minWidth: "150px", maxWidth: "200px", margin: "auto"}}/>
                            {types[0] && <TypeBtn types={types!}/>}
                        </Stack>
                    </Paper>
                </UnstyledButton>
            }
        </>
    );
}

export default PokemonBtn;