import {Table, Title} from "@mantine/core";
import {IPokemonGrowthRate, IPokemonInfo} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";

interface IProps {
    pokemon: IPokemonInfo[],
    growthRate: IPokemonGrowthRate[],
}

function BreedingTable({pokemon, growthRate}: IProps) {
    const language = useRecoilValue(languageState);

    return (
        <Table layout={"fixed"} withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th colSpan={5} style={{textAlign: "center"}}>
                        <Title order={4}>{language === "ko" ? "유전 정보" : "Breeding"}</Title>
                    </Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "성비" : "Gender Ratio"}</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "알 그룹" : "Egg Group"}</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "부화 걸음수" : "Hatch Count"}</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "최대 경험치량" : "Max Exp"}</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>{language === "ko" ? "포획률" : "Catch Rate"}</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    {/* 성비 */}
                    <Table.Td align={"center"}>
                        {pokemon[0].specy.gender_rate !== -1 && (8 - pokemon[0].specy.gender_rate) / 8 * 100 < 100 &&
                            <>{language === "ko" ? "수컷" : "M"}: {(8 - pokemon[0].specy.gender_rate) / 8 * 100}%<br/></>}
                        {pokemon[0].specy.gender_rate !== -1 && pokemon[0].specy.gender_rate / 8 * 100 < 100 && `${language === "ko" ? "암컷" : "F"}: ${pokemon[0].specy.gender_rate / 8 * 100}%`}
                        {pokemon[0].specy.gender_rate === -1 && "없음"}
                    </Table.Td>

                    {/* 알 그룹 */}
                    {pokemon[0].specy.egg_group.length > 0 &&
                        <Table.Td align={"center"}>
                            {pokemon[0].specy.egg_group[0].egg_groups.names[0]?.name}
                            {pokemon[0].specy.egg_group.length > 1 && `, ${pokemon[0].specy.egg_group[1].egg_groups.names[0]?.name}`}
                        </Table.Td>}

                    {/* 부화 카운트 */}
                    <Table.Td align={"center"}>{pokemon[0].specy.hatch_counter}</Table.Td>

                    {/* 최대 경험치량 */}
                    <Table.Td align={"center"}>
                        <p style={{wordBreak: "break-word"}}>{growthRate[0].experiences[99].experience.toLocaleString()}</p>
                    </Table.Td>

                    {/* 포획률 */}
                    <Table.Td align={"center"}>{pokemon[0].specy.capture_rate}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

export default BreedingTable;