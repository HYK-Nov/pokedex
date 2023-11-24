import {Table, Title} from "@mantine/core";
import {IPokemonDetail} from "../../../../ts/interface/pokemons.interfaces.ts";
import {IDetailAbilities} from "../../../../ts/interface/detail.interfaces.ts";
import {useEffect, useState} from "react";
import {useFetch} from "../../../../hooks/useFetch.ts";

function AbilityTable({detail}: { detail: IPokemonDetail }) {
    const [abilities, setAbilities] = useState<IDetailAbilities[]>([]);

    const {findAbilities} = useFetch();
    useEffect(() => {
        // 특성 정보 가져오기
        findAbilities(detail.abilities)
            .then(res => setAbilities(res));
    }, [detail]);

    // 특성 테이블 열
    const abilityRows = detail.abilities.map((item, idx) => {
        if (abilities.length > 0 && abilities[idx]) {
            return (
                <Table.Tr key={idx}>
                    {abilities[idx]?.name?.name &&
                        <Table.Th w={"20%"}>{abilities[idx].name.name} {item.is_hidden && "*"}</Table.Th>}
                    {abilities[idx]?.flavor_text?.flavor_text &&
                        <Table.Td>{abilities[idx].flavor_text.flavor_text}</Table.Td>}
                </Table.Tr>
            );
        } else return null;
    });

    return (
        <Table withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Td align={"center"} colSpan={2}>
                        <Title order={4}>특성</Title>
                    </Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {abilityRows}
            </Table.Tbody>
            <Table.Caption style={{textAlign: "end"}}>숨겨진 특성(*)</Table.Caption>
        </Table>
    );
}

export default AbilityTable;