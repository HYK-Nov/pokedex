import TypeBtn from "../../../components/common/TypeBtn.tsx";
import {useMemo} from "react";
import {SimpleGrid} from "@mantine/core";

interface IProps {
    types: string[];
    onClick: (item:string) => void;
}

const TYPE = ["normal", "fire", "water", "grass", "flying",
    "fighting", "poison", "electric", "ground", "rock",
    "psychic", "ice", "bug", "ghost", "steel",
    "dragon", "dark", "fairy"];

function TypeSelect({types, onClick}: IProps) {

    const typeItems = useMemo(() => TYPE.map((item) => (
        <TypeBtn key={item} type={item} disabled={!types.includes(item)}
                 onClick={() => onClick(item)}/>
    )), [types]);

    return (
        <SimpleGrid cols={{base: 3, sm: 5}} mb={"1rem"}>
            {typeItems}
        </SimpleGrid>
    );
}

export default TypeSelect;