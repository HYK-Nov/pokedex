import {Group, Table, Text, Title} from "@mantine/core";
import {IPokemonInfo} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";
import {useMediaQuery} from "@mantine/hooks";
import TypeSetBtn from "../../../../components/common/TypeSetBtn.tsx";

function InfoTable({pokemon}: {pokemon: IPokemonInfo[]}) {
    const isMobile = useMediaQuery(`(max-width: 36em)`);
    const language = useRecoilValue(languageState);

    console.log(pokemon);

    // 포켓몬 이름 현재 언어 기준 맨 앞으로 정렬
    const names = [...pokemon[0].specy?.names || []].sort((prev, next) => {
        if (prev.language.name === language) return -1;
        if (next.language.name === language) return 1;
        return 0;
    });

    const nameRows = names.map((item, idx) =>
        <Text key={idx} style={{fontWeight: idx === 0 ? "bold" : "", fontSize: "0.9rem"}}>{item.name}</Text>);

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
                    <Table.Td colSpan={isMobile ? 3 : 1}>{names.length > 0 && names[0].genus}</Table.Td>
                    {!isMobile &&
                        <>
                            <Table.Th w={"20%"}>{language === "ko" ? "타입" : "Type"}</Table.Th>
                            <Table.Td>
                                <TypeSetBtn types={pokemon[0].types}/>
                            </Table.Td>
                        </>
                    }
                </Table.Tr>
                {isMobile &&
                    <Table.Tr>
                        <Table.Th w={"20%"}>{language === "ko" ? "타입" : "Type"}</Table.Th>
                        <Table.Td colSpan={3}>
                            <TypeSetBtn types={pokemon[0].types}/>
                        </Table.Td>
                    </Table.Tr>
                }
                <Table.Tr>
                    <Table.Th>{language === "ko" ? "키" : "Height"}</Table.Th>
                    <Table.Td>{(pokemon[0].height / 10).toFixed(1)}m</Table.Td>
                    <Table.Th>{language === "ko" ? "몸무게" : "Weight"}</Table.Th>
                    <Table.Td>{(pokemon[0].weight / 10).toFixed(1)}kg</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

export default InfoTable;