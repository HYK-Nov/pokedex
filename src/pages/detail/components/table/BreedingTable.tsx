import {Table, Title} from "@mantine/core";
import {IPokemonSpecies} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useEffect, useState} from "react";
import {useFetch} from "../../../../hooks/useFetch.ts";

function BreedingTable({species}: { species: IPokemonSpecies }) {
    const [eggGroup, setEggGroup] = useState<string[]>([]);
    const [exp, setExp] = useState(0);

    const {findEggGroups, findExp} = useFetch();
    useEffect(() => {

        // 알 그룹 가져오기
        findEggGroups(species.egg_groups)
            .then(res => setEggGroup(res));

        // 최대 경험치 가져오기
        findExp(species.growth_rate)
            .then(res => setExp(res));

    }, [species]);

    return (
        <Table layout={"fixed"} withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th colSpan={5} style={{textAlign: "center"}}>
                        <Title order={4}>유전 정보</Title>
                    </Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th style={{textAlign: "center"}}>성비</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>알 그룹</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>부화 걸음수</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>최대 경험치량</Table.Th>
                    <Table.Th style={{textAlign: "center"}}>포획률</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    {/* 성비 */}
                    <Table.Td align={"center"}>
                        {species.gender_rate !== -1 && (8 - species.gender_rate) / 8 * 100 < 100 &&
                            <>수컷: {(8 - species.gender_rate) / 8 * 100}%<br/></>}
                        {species.gender_rate !== -1 && species.gender_rate / 8 * 100 < 100 && `암컷: ${species.gender_rate / 8 * 100}%`}
                        {species.gender_rate === -1 && `없음`}
                    </Table.Td>

                    {/* 알 그룹 */}
                    {eggGroup.length > 0 &&
                        <Table.Td align={"center"}>
                            {eggGroup[0]}
                            {eggGroup.length > 1 && `, ${eggGroup[1]}`}
                        </Table.Td>}

                    {/* 부화 걸음수 */}
                    <Table.Td align={"center"}>{(255 * (species.hatch_counter + 1)).toLocaleString()}</Table.Td>

                    {/* 최대 경험치량 */}
                    <Table.Td align={"center"}>
                        <p style={{wordBreak:"break-word"}}>{exp.toLocaleString()}</p>
                    </Table.Td>

                    {/* 포획률 */}
                    <Table.Td align={"center"}>{species.capture_rate}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

export default BreedingTable;