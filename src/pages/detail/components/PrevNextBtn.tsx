import {useNavigate} from "react-router-dom";
import {Grid, Image, Stack, Text, UnstyledButton} from "@mantine/core";

interface IProps {
    id: string | number;
    name: string;
    current?: boolean;
}

function PrevNextBtn({id, name, current}: IProps) {
    const navigate = useNavigate();

    return (
        <UnstyledButton onClick={() => navigate(`/pokedex/${id}`)}>
            <Grid align={"center"} justify={"center"} style={{textAlign:"center"}}>
                <Grid.Col span={{base: 10, sm: 6}}>
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                           alt={name}
                           h={"100%"}
                           fallbackSrc={`https://placehold.co/100x100?text=${name}`}
                           loading={"lazy"}
                    />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                    <Stack gap={"0.5rem"}>
                        <Text size={"0.8rem"} fw={current ? "bold" : "normal"}>No. {id}</Text>
                        <Text size={"1.2rem"} fw={current ? "bold" : "normal"}>{name}</Text>
                    </Stack>
                </Grid.Col>
            </Grid>
        </UnstyledButton>
    );
}

export default PrevNextBtn;