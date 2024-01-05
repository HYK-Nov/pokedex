import TypeBtn from "../../../components/common/TypeBtn.tsx";
import {useMemo} from "react";
import {SimpleGrid} from "@mantine/core";

interface IProps {
    types: string[];
    onClick: (item: string) => void;
}

const TYPE = ["normal", "fighting", "flying", "poison", "ground",
    "rock", "bug", "ghost", "steel", "fire",
    "water", "grass", "electric", "psychic", "ice",
    "dragon", "dark", "fairy"];

function TypeSelect({types, onClick}: IProps) {

    const typeItems = useMemo(() => TYPE.map((item, idx) => (
        <TypeBtn key={idx}
                 id={idx + 1}
                 type={item}
                 disabled={!types.includes(item)}
            // onlyIcon={true}
                 onClick={() => onClick(item)}/>
    )), [types]);

    return (
        <SimpleGrid cols={{base: 2, sm: 3, md: 6}} mb={"1rem"}>
            {typeItems}
        </SimpleGrid>
    );
}

export default TypeSelect;