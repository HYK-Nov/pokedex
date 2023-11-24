import TypeBtn from "../../../../components/common/TypeBtn.tsx";
import {Group, Table, Text, Title} from "@mantine/core";
import {IPokemonDetail, IPokemonSpecies} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";
import {useEffect, useState} from "react";
import {useFetch} from "../../../../hooks/useFetch.ts";

interface IProps {
    detail: IPokemonDetail;
    species: IPokemonSpecies;
}

function InfoTable({detail, species}: IProps) {
    const language = useRecoilValue(languageState);
    const [genus, setGenus] = useState("");

    const {findGenus} = useFetch();
    useEffect(() => {
        // 분류 정보 가져오기
        findGenus(species)
            .then(res => setGenus(res!));
    }, [species]);

    // 포켓몬 이름 현재 언어 기준 맨 앞으로 정렬
    const names = species.names
        .filter((item) => ["ja-Hrkt", "ko", "en"].includes(item.language.name))
        .map((item) => ({language: item.language.name, name: item.name}))
        .sort((prev, next) => {
            if (prev.language === language) return -1;
            if (next.language === language) return 1;
            return 0;
        })
    const nameRows = names.map((item, idx) =>
        <Text key={idx} style={{fontWeight: idx === 0 ? "bold" : "", fontSize: "0.9rem"}}>{item.name}</Text>);

    return (
        <Table withColumnBorders mb={"1rem"}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Td align={"center"} colSpan={4}>
                        <Title order={4}>기본 정보</Title>
                    </Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th>이름</Table.Th>
                    <Table.Td colSpan={3}>
                        <Group>{nameRows}</Group>
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th w={"20%"}>분류</Table.Th>
                    <Table.Td>{genus}</Table.Td>

                    <Table.Th w={"20%"}>타입</Table.Th>
                    <Table.Td>
                        <TypeBtn types={detail.types}/>
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>키</Table.Th>
                    <Table.Td>{(detail.height / 10).toFixed(1)}m</Table.Td>
                    <Table.Th>몸무게</Table.Th>
                    <Table.Td>{(detail.weight / 10).toFixed(1)}kg</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

export default InfoTable;