import {Box, Button, Container, Flex, Group, Menu, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import SearchBox from "./header/SearchBox.tsx";
import style from "../../styles/Header.module.scss";

function Header() {
    const navigate = useNavigate();
    return (
        <Box bg={"red"} h={"55px"} style={{position: "sticky", top: 0}}>
            <Flex h={"100%"} align={"center"}>
                <Container w={"100%"}>
                    <Group justify={"space-between"}>
                        <div>
                            <UnstyledButton onClick={() => navigate("/")}>
                                <b className={`${style.logo}`}>포켓몬 도감</b>
                            </UnstyledButton>
                            <Menu trigger={"hover"}>
                                <Menu.Target>
                                    <Button>도감</Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item onClick={() => navigate("/category")}>타입</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </div>
                        <SearchBox/>
                    </Group>
                </Container>
            </Flex>
        </Box>
    );
}

export default Header;