import {Table, Title} from "@mantine/core";
import {IPokemonSpecies} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useEffect} from "react";
import {useFetch} from "../../../../hooks/useFetch.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";
import {useQuery} from "@tanstack/react-query";

function BreedingTable({species}: { species: IPokemonSpecies }) {
    const language = useRecoilValue(languageState);

    const {findEggGroups, findExp} = useFetch();
    // 알 그룹 가져오기
    const {data: eggGroup, refetch: eggGroupRefetch} = useQuery({
        queryKey: ['eggGroup', species.egg_groups],
        queryFn: () => findEggGroups(species.egg_groups),
        initialData: [],
    });
    // 최대 경험치 가져오기
    const {data: exp} = useQuery({
        queryKey: ['eggGroup', species.growth_rate],
        queryFn: () => findExp(species.growth_rate),
        initialData: 0,
    })

    useEffect(() => {
        eggGroupRefetch();
    }, [language]);

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
                        {species.gender_rate !== -1 && (8 - species.gender_rate) / 8 * 100 < 100 &&
                            <>{language === "ko" ? "수컷" : "M"}: {(8 - species.gender_rate) / 8 * 100}%<br/></>}
                        {species.gender_rate !== -1 && species.gender_rate / 8 * 100 < 100 && `${language === "ko" ? "암컷" : "F"}: ${species.gender_rate / 8 * 100}%`}
                        {species.gender_rate === -1 && "없음"}
                    </Table.Td>

                    {/* 알 그룹 */}
                    {eggGroup.length > 0 &&
                        <Table.Td align={"center"}>
                            {eggGroup[0]}
                            {eggGroup.length > 1 && `, ${eggGroup[1]}`}
                        </Table.Td>}

                    {/* 부화 카운트 */}
                    <Table.Td align={"center"}>{species.hatch_counter}</Table.Td>

                    {/* 최대 경험치량 */}
                    <Table.Td align={"center"}>
                        <p style={{wordBreak: "break-word"}}>{exp.toLocaleString()}</p>
                    </Table.Td>

                    {/* 포획률 */}
                    <Table.Td align={"center"}>{species.capture_rate}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

export default BreedingTable;