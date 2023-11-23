import {Box, Button, Container, Menu} from "@mantine/core";
import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <Box bg={"red"}>
            <Container>
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
        </Box>
    );
}

export default Header;