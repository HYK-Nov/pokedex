import {useNavigate} from "react-router-dom";
import {Flex, Image, Stack, Text, UnstyledButton} from "@mantine/core";

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
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                     alt={name}
                     fallbackSrc={`https://placehold.co/100x100?text=${name}`}
                     loading={"lazy"}
                />
                <Stack gap={"0.5rem"}>
                    <Text size={"0.8rem"} fw={current ? "bold" : "normal"}>No. {id}</Text>
                    <Text size={"1.3rem"} fw={current ? "bold" : "normal"}>{name}</Text>
                </Stack>
            </Flex>
        </UnstyledButton>
    );
}

export default PrevNextBtn;