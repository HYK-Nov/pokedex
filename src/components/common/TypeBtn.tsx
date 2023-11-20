import {TYPE_COLORS, TYPE_KO} from "../../ts/types/pokemons.types.ts";
import {Badge, SimpleGrid} from "@mantine/core";
import {IPokemonType} from "../../ts/interface/pokemons.interfaces.ts";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {languageState} from "../../contexts/language.ts";

function TypeBtn({types}: { types: IPokemonType[] }) {
    const navigate = useNavigate();
    const language = useRecoilValue(languageState);

    return (
        <SimpleGrid cols={2}>
            <Badge color={TYPE_COLORS[types[0].type?.name]}
                   radius={"0.3rem"}
                   fullWidth
                   style={{cursor: "pointer"}}
                   onClick={(e) => {
                       e.stopPropagation();
                       navigate(`type/${types[0].type.name}`);
                   }}>
                {language === "ko" ? TYPE_KO[types[0].type.name] : types[0].type.name}
            </Badge>
            {types.length > 1 &&
                <Badge color={TYPE_COLORS[types[1].type?.name]}
                       radius={"0.3rem"}
                       fullWidth
                       style={{cursor: "pointer"}}
                       onClick={(e) => {
                           e.stopPropagation();
                           navigate(`type/${types[1].type.name}`);
                       }}>
                    {language === "ko" ? TYPE_KO[types[1].type.name] : types[1].type.name}
                </Badge>}
        </SimpleGrid>
    );
}

export default TypeBtn;