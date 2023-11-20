import {useNavigate} from "react-router-dom";
import {Flex, Stack, Text, UnstyledButton} from "@mantine/core";

interface IProps {
    id: string | number;
    name: string;
    current?: boolean;
}

function PrevNextBtn({id, name, current}: IProps) {
    const navigate = useNavigate();

    return (
        <UnstyledButton onClick={() => navigate(`/${id}`)}>
            <Flex align={"center"}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name}/>
                <Stack gap={"0.5rem"}>
                    <Text size={"0.8rem"} fw={current ? "bold" : "normal"}>No. {id}</Text>
                    <Text size={"1.3rem"} fw={current ? "bold" : "normal"}>{name}</Text>
                </Stack>
            </Flex>
        </UnstyledButton>
    );
}

export default PrevNextBtn;