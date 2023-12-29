import {Image, Paper, Stack, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import TypeBtn from "./TypeSetBtn.tsx";
import placeholder from '../../assets/images/placeholder.webp';

function PokemonBtn({data}: { data: IPokemon }) {
    const navigate = useNavigate();
    const lasId = useRecoilValue(lastIdState);

    return (
        <>
            {(data.id <= lasId) &&
                <UnstyledButton onClick={() => navigate(`/${data.id}`)}>
                    <Paper shadow={"xs"} p={"md"} style={{height: "100%"}}>
                        <Stack gap={"1.5rem"}>
                            <Stack gap={"0.3rem"}>
                                <b style={{fontSize: '0.75rem', color: 'gray'}}>No. {data.id}</b>
                                <b style={{fontSize: '1.3rem'}}>{data.name}</b>
                            </Stack>
                            <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                                fallbackSrc={placeholder}
                                alt={data.name}
                                loading={"lazy"}
                                style={{width: "60%", minWidth: "150px", maxWidth: "200px", margin: "auto"}}/>
                            {data.specy.pokemons[0].types && <TypeBtn types={data.specy.pokemons[0].types}/>}
                        </Stack>
                    </Paper>
                </UnstyledButton>
            }
        </>
    );
}

export default PokemonBtn;