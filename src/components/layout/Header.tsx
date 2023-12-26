import {Box, Container, Flex, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import style from "../../styles/Header.module.scss";
import {useRecoilValue} from "recoil";
import {languageState} from "../../contexts/language.ts";
import LanguageBtn from "./header/LanguageBtn.tsx";
import SearchBox from "./header/SearchBox.tsx";

function Header() {
    const language = useRecoilValue(languageState);
    const navigate = useNavigate();

    return (
        <Box className={style.header}>
            <Flex h={"100%"} align={"center"}>
                <Container w={"100%"} size={"lg"}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex", gap: "2rem"}}>
                            <UnstyledButton onClick={() => navigate("/")}>
                                <b className={`${style.logo}`}>{language === "ko" ? "포켓몬 도감" : "Pokedex"}</b>
                            </UnstyledButton>
                            <UnstyledButton onClick={() => navigate("/category")}>
                                <b className={`${style.menuItem}`}>{language === "ko" ? "타입" : "Type"}</b>
                            </UnstyledButton>
                        </div>

                        <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
                            <SearchBox/>
                            <LanguageBtn/>
                        </div>
                    </div>
                </Container>
            </Flex>
        </Box>
    );
}

export default Header;