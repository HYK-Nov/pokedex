import {useNavigate} from "react-router-dom";
import {Grid, Image, Stack, Text, UnstyledButton} from "@mantine/core";
import {isMobile} from "../../../hooks/useCheckDevice.ts";

interface IProps {
    id: string | number;
    name: string;
    current?: boolean;
}

function PrevNextBtn({id, name, current}: IProps) {
    const navigate = useNavigate();
    const mobile = isMobile();

    return (
        <UnstyledButton onClick={() => navigate(`/pokedex/${id}`)}>
            <Grid align={"center"} justify={"center"} grow gutter={"0"}>
                <Grid.Col span={{base: 12, sm: 6}}>
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                           alt={name}
                           m={"auto"}
                           fallbackSrc={`https://placehold.co/100x100?text=${name}`}
                           loading={"lazy"}
                    />
                </Grid.Col>
                <Grid.Col span={{base: "auto", sm: 6}} style={{textAlign: mobile ? "center" : "left"}}>
                    <Stack gap={"0.5rem"}>
                        <Text size={"0.75rem"} fw={current ? "bold" : "normal"}>No. {id}</Text>
                        <Text size={"1.1rem"} fw={current ? "bold" : "normal"} style={{wordBreak:"break-word"}}>{name}</Text>
                    </Stack>
                </Grid.Col>
            </Grid>
        </UnstyledButton>
    );
}

export default PrevNextBtn;