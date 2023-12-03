import TypeBtn from "../../../../components/common/TypeSetBtn.tsx";
import {Group, Table, Text, Title} from "@mantine/core";
import {IPokemonDetail, IPokemonSpecies} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";
import {useEffect} from "react";
import {useFetch} from "../../../../hooks/useFetch.ts";
import {useQuery} from "@tanstack/react-query";
import {useMediaQuery} from "@mantine/hooks";

interface IProps {
    detail: IPokemonDetail;
    species: IPokemonSpecies;
}

function InfoTable({detail, species}: IProps) {
    const isMobile = useMediaQuery(`(max-width: 36em)`);
    const language = useRecoilValue(languageState);

    const {findGenus} = useFetch();
    // 분류 정보 가져오기
    const {data: genus, refetch: genusRefetch} = useQuery({
        queryKey: ['genus', species],
        queryFn: () => findGenus(species),
    })

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

    useEffect(() => {
        genusRefetch();
    }, [language]);

    return (
        <Table withColumnBorders mb={"1rem"}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Td align={"center"} colSpan={4}>
                        <Title order={4}>{language === "ko" ? "기본 정보" : "Basic Info"}</Title>
                    </Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th>{language === "ko" ? "이름" : "Name"}</Table.Th>
                    <Table.Td colSpan={3}>
                        <Group>{nameRows}</Group>
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th w={"20%"}>{language === "ko" ? "분류" : "Category"}</Table.Th>
                    <Table.Td colSpan={isMobile ? 3 : 1}>{genus}</Table.Td>
                    {!isMobile &&
                        <>
                            <Table.Th w={"20%"}>{language === "ko" ? "타입" : "Type"}</Table.Th>
                            <Table.Td>
                                <TypeBtn types={detail.types}/>
                            </Table.Td>
                        </>
                    }
                </Table.Tr>
                {isMobile &&
                    <Table.Tr>
                        <Table.Th w={"20%"}>{language === "ko" ? "타입" : "Type"}</Table.Th>
                        <Table.Td colSpan={3}>
                            <TypeBtn types={detail.types}/>
                        </Table.Td>
                    </Table.Tr>
                }
                <Table.Tr>
                    <Table.Th>{language === "ko" ? "키" : "Height"}</Table.Th>
                    <Table.Td>{(detail.height / 10).toFixed(1)}m</Table.Td>
                    <Table.Th>{language === "ko" ? "몸무게" : "Weight"}</Table.Th>
                    <Table.Td>{(detail.weight / 10).toFixed(1)}kg</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

export default InfoTable;