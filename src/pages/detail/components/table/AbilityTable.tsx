import {Table, Title} from "@mantine/core";
import {IPokemonDetail} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useEffect} from "react";
import {useFetch} from "../../../../hooks/useFetch.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";
import {useQuery} from "@tanstack/react-query";

function AbilityTable({detail}: { detail: IPokemonDetail }) {
    const language = useRecoilValue(languageState);

    const {findAbilities} = useFetch();
    // 특성 정보 가져오기
    const {data: abilities, refetch: abilitiesRefetch} = useQuery({
        queryKey: ['abilities', detail.abilities],
        queryFn: () => findAbilities(detail.abilities),
        initialData: [],
    })

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

    useEffect(() => {
        abilitiesRefetch();
    }, [language]);

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