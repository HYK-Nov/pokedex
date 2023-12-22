import {Table, Title} from "@mantine/core";
import {IPokemonAbility} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";

function AbilityTable({ability}: { ability: IPokemonAbility[] }) {
    const language = useRecoilValue(languageState);

    // 특성 테이블 열
    const abilityRows = ability?.map((item, idx) => {
        if (item !== null) {
            return (
                <Table.Tr key={idx}>
                    <Table.Th w={"20%"}>{item.abilities.ability[0].name} {item.is_hidden && "*"}</Table.Th>
                    <Table.Td>{item.abilities.ability_text[0].text}</Table.Td>
                </Table.Tr>
            );
        } else return null;
    });

    return (
        <Table withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Td align={"center"} colSpan={2}>
                        <Title order={4}>{language === "ko" ? "특성" : "Abilities"}</Title>
                    </Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {abilityRows}
            </Table.Tbody>
            <Table.Caption
                style={{textAlign: "end"}}>{language === "ko" ? "숨겨진 특성" : "Hidden Ability"}(*)</Table.Caption>
        </Table>
    );
}

export default AbilityTable;