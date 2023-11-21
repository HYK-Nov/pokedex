import {useLoaderData} from "react-router-dom";
import {
    IPokemonDetail, IPokemonFlavorText, IPokemonSpecies,
} from "../../ts/interface/pokemons.interfaces.ts";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {Grid, Image, SimpleGrid, Table, Tabs, Text, Title} from "@mantine/core";
import {VERSION_KO} from "../../ts/types/pokemons.types.ts";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import PrevNextBtn from "./components/PrevNextBtn.tsx";
import TypeBtn from "../../components/common/TypeBtn.tsx";
import {IDetailAbilities} from "../../ts/interface/detail.interfaces.ts";
import {languageState} from "../../contexts/language.ts";

interface ILoaderData {
    detail: IPokemonDetail;
    species: IPokemonSpecies;
}

function Detail() {
    const {detail, species} = useLoaderData() as ILoaderData;
    const id = detail.species.url.split("/").slice(6, 7).pop();
    const lastId = useRecoilValue(lastIdState);
    const language = useRecoilValue(languageState);
    const [artwork, setArtwork] = useState("");
    const [curName, setCurName] = useState("");
    const [prevName, setPrevName] = useState("");
    const [nextName, setNextName] = useState("");
    const [genus, setGenus] = useState("");
    const [flavorText, setFlavorText] = useState<IPokemonFlavorText[]>([]);
    const [abilities, setAbilities] = useState<IDetailAbilities[]>([]);

    const {findName, findArtwork, findFlavorTexts, findGenus, findAbilities} = useFetch();
    useEffect(() => {
        setArtwork(findArtwork(id!));

        // 포켓몬 cur, prev, next 이름 가져오기
        findName(id!)
            .then(res => setCurName(res!));
        if (Number(id) - 1 > 0) {
            findName(Number(id) - 1!)
                .then(res => setPrevName(res!));
        } else setPrevName("");

        if (Number(id) + 1 <= lastId) {
            findName(Number(id) + 1!)
                .then(res => setNextName(res!));
        } else setNextName("");

        findAbilities(detail.abilities)
            .then(res => setAbilities(res));

        findGenus(species)
            .then(res => setGenus(res!));

        findFlavorTexts(species)
            .then(res => setFlavorText(res!));
    }, [id]);

    const names = species.names
        .filter((item) => ["ja-Hrkt", "ko", "en"].includes(item.language.name))
        .map((item) => ({language: item.language.name, name: item.name}))
        .sort((prev, next) => {
            if (prev.language === language) return -1;
            if (next.language === language) return 1;
            return 0;
        })
    const nameRows = names.map((item, idx) =>
        <Table.Td key={idx} style={{fontWeight: idx === 0 ? "bold" : ""}}>{item.name}</Table.Td>);

    const flavorTextRows = flavorText.map((item) => (
        <Table.Tr key={item.version.name}>
            <Table.Th w={"20%"}>{VERSION_KO[item.version.name]}</Table.Th>
            <Table.Td>{item.flavor_text}</Table.Td>
        </Table.Tr>));

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
        <>
            <Title pb={"1rem"}>{curName}</Title>

            <Grid>
                <Grid.Col span={4}>
                    <Image src={artwork} alt={curName}
                           fallbackSrc={`https://placehold.co/300x300?text=${detail.name}`}/>
                </Grid.Col>
                <Grid.Col span={"auto"}>
                    <SimpleGrid cols={3}>
                        {prevName && <PrevNextBtn id={Number(id) - 1} name={prevName}/>}
                        <PrevNextBtn id={id!} name={curName} current/>
                        {nextName && <PrevNextBtn id={Number(id) + 1} name={nextName}/>}
                    </SimpleGrid>

                    <Tabs defaultValue={"info"}>
                        <Tabs.List grow>
                            <Tabs.Tab value={"info"}>정보</Tabs.Tab>
                            <Tabs.Tab value={"flavorText"}>도감 설명</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value={"info"} pt={"1rem"}>
                            {/* 기본 정보 테이블 */}
                            <Table mb={"1rem"}>
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
                                        {nameRows}
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

                            {/* 특성 테이블 */}
                            <Table>
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
                        </Tabs.Panel>
                        <Tabs.Panel value={"flavorText"} pt={"1rem"}>
                            <Table>
                                <Table.Tbody>
                                    {flavorText.length > 0 && flavorTextRows}
                                </Table.Tbody>
                            </Table>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </>
    )
        ;
}

export default Detail;