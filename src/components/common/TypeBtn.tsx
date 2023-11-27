import {TYPE_COLORS, TYPE_KO} from "../../ts/types/pokemons.types.ts";
import TypeIcon from "../TypeIcon.tsx";
import {Badge} from "@mantine/core";
import {useRecoilValue} from "recoil";
import {languageState} from "../../contexts/language.ts";
import React from "react";

interface IProps {
    type: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent | null) => void;
}

function TypeBtn({type, disabled, onClick}: IProps) {
    const language = useRecoilValue(languageState);

    return (
        <>
            {!disabled ?
                <Badge color={TYPE_COLORS[type]}
                       radius={"sm"}
                       h={"1.5rem"}
                       fullWidth
                       leftSection={<TypeIcon type={type} height={"1rem"}/>}
                       style={{cursor: "pointer"}}
                       onClick={onClick}
                >
                    {language === "ko" ? TYPE_KO[type] : type}
                </Badge> :
                <Badge color={"#bfbfbf"}
                       radius={"sm"}
                       h={"1.5rem"}
                       fullWidth
                       leftSection={<TypeIcon type={type} height={"1rem"}/>}
                       style={{cursor: "pointer"}}
                       onClick={onClick}>
                    {language === "ko" ? TYPE_KO[type] : type}
                </Badge>
            }
        </>
    );
}

export default TypeBtn;