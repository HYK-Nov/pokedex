import {Flex, Group, UnstyledButton} from "@mantine/core";
import {IconWorld} from "@tabler/icons-react";
import style from "../../../styles/Header.module.scss";
import {useRecoilState} from "recoil";
import {languageState} from "../../../contexts/language.ts";
import {useMediaQuery} from "@mantine/hooks";

function LanguageBtn() {
    const isMobile = useMediaQuery(`(max-width: 768px)`);
    const [language, setLanguage] = useRecoilState(languageState);

    const handleLanguage = (lan: string) => {
        setLanguage(lan);
        window.sessionStorage.setItem("language", lan);
    }

    return (
        <>
            {!isMobile ?
                <Group>
                    <Flex gap={"0.5rem"}>
                        <IconWorld color={"white"}/>
                        <UnstyledButton className={`${style.menuItem} ${language === "ko" && style.active}`}
                                        onClick={() => handleLanguage("ko")}>한국어</UnstyledButton>
                    </Flex>
                    <UnstyledButton className={`${style.menuItem} ${language === "en" && style.active}`}
                                    onClick={() => handleLanguage("en")}>ENG</UnstyledButton>
                </Group>
                :
                <Group gap={"0.5rem"}>
                    <IconWorld color={"white"}/>
                    <UnstyledButton className={`${style.menuItem} ${style.active}`}
                                    onClick={() => handleLanguage(language === "ko" ? "en" : "ko")}>
                        {language === "ko" ? "한국어" : "ENG"}
                    </UnstyledButton>
                </Group>
            }
        </>
    );
}

export default LanguageBtn;