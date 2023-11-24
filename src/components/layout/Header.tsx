import {Box, Button, Container, Flex, Menu} from "@mantine/core";
import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <Box bg={"red"} h={"8vh"}>
            <Flex h={"100%"} align={"center"}>
                <Container w={"100%"}>
                    <Button onClick={() => navigate("/pokedex")}>Pokedex</Button>
                    <Menu trigger={"hover"}>
                        <Menu.Target>
                            <Button>도감</Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={() => navigate("/pokedex/type")}>타입</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Container>
            </Flex>
        </Box>
    );
}

export default Header;