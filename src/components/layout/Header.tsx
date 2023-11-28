import {Box, Container, Flex, Switch, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import SearchBox from "./header/SearchBox.tsx";
import style from "../../styles/Header.module.scss";
import {useRecoilState} from "recoil";
import {languageState} from "../../contexts/language.ts";

function Header() {
    const [language, _] = useRecoilState(languageState);
    const navigate = useNavigate();
    return (
        <Box bg={"red"} h={"55px"} style={{position: "sticky", top: 0}}>
            <Flex h={"100%"} align={"center"}>
                <Container w={"100%"} size={"lg"}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex", gap: "1rem"}}>
                            <UnstyledButton onClick={() => navigate("/")}>
                                <b className={`${style.logo}`}>{language === "ko" ? "포켓몬 도감" : "Pokedex"}</b>
                            </UnstyledButton>
                            <UnstyledButton onClick={() => navigate("/category")}>
                                <b className={`${style.menuItem}`}>{language === "ko" ? "카테고리" : "Category"}</b>
                            </UnstyledButton>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Switch defaultChecked size={"lg"} onLabel={"한국어"} offLabel={"Eng"}/>
                            <SearchBox/>
                        </div>
                    </div>
                </Container>
            </Flex>
        </Box>
    );
}

export default Header;