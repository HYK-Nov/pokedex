import {Table, Title} from "@mantine/core";
import {IPokemonDetail} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";

function StatTable({detail}: { detail: IPokemonDetail }) {
    const language = useRecoilValue(languageState);

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
                    <Table.Td align={"center"}>{detail.stats[0].base_stat}</Table.Td>
                    <Table.Td align={"center"}>{detail.stats[1].base_stat}</Table.Td>
                    <Table.Td align={"center"}>{detail.stats[2].base_stat}</Table.Td>
                    <Table.Td align={"center"}>{detail.stats[3].base_stat}</Table.Td>
                    <Table.Td align={"center"}>{detail.stats[4].base_stat}</Table.Td>
                    <Table.Td align={"center"}>{detail.stats[5].base_stat}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

export default StatTable;