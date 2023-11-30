import {Badge, SimpleGrid} from "@mantine/core";
import {REGION_KO} from "../../../ts/types/pokemons.types.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../contexts/language.ts";

const REGION = ["kanto", "johto", "hoenn", "sinnoh", "unova", "kalos", "alola", "galar", "paldea"];

interface IProps {
    region: string;
    onClick: (item: string) => void;
}

function RegionSelect({region, onClick}: IProps) {
    const language = useRecoilValue(languageState);

    const items = REGION.map((item, idx) => (
        <Badge key={idx}
               color={region === item ? "" : "#dddddd"}
               radius={"sm"}
               h={"1.5rem"}
               fullWidth
               style={{cursor: "pointer"}}
               onClick={() => onClick(item)}>
            {language === "ko" ? REGION_KO[item] : item}
        </Badge>
    ))

    return (
        <SimpleGrid cols={{base: 3, md: 6}} mb={"1rem"}>
            {items}
        </SimpleGrid>
    );
}

export default RegionSelect;