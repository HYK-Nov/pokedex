import {Table, Title} from "@mantine/core";
import {IPokemonStat} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";

function StatTable({stat}: { stat: IPokemonStat[] }) {
    const language = useRecoilValue(languageState);

    const statRows = stat?.map((item, idx) => {
        if (item.stats[0]) {
            return (
                <Table.Td align={"center"} key={idx}>{item.stats[0].base_stat}</Table.Td>
            )
        }else return null;
    })

    return (
        <Table layout={"fixed"} withColumnBorders mb={"1rem"}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th colSpan={6} style={{textAlign: "center"}}>
                        <Title order={4}>{language === "ko" ? "종족치" : "Stat"}</Title>
                    </Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th style={{textAlign: "center"}}>HP</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "공격" : "Atk"}</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "방어" : "Def"}</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "특수 공격" : "Sp.Atk"}</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "특수 방어" : "Sp.Def"}</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "스피드" : "Speed"}</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    {statRows}
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

export default StatTable;