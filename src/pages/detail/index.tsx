import {useLoaderData} from "react-router-dom";
import {
    IPokemonDetail,
    IPokemonFlavorText, IPokemonSpecies,
} from "../../ts/interface/pokemons.interfaces.ts";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {Grid, Image, SimpleGrid, Table, Tabs, Text, Title} from "@mantine/core";
import {VERSION_KO} from "../../ts/types/pokemons.types.ts";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import PrevNextBtn from "./components/PrevNextBtn.tsx";
import TypeBtn from "../../components/common/TypeBtn.tsx";

interface ILoaderData {
    detail: IPokemonDetail;
    species: IPokemonSpecies;
}

function Detail() {
    const {detail, species} = useLoaderData() as ILoaderData;
    const id = detail.species.url.split("/").slice(6, 7).pop();
    const lastId = useRecoilValue(lastIdState);
    const [artwork, setArtwork] = useState("");
    const [curName, setCurName] = useState("");
    const [prevName, setPrevName] = useState("");
    const [nextName, setNextName] = useState("");
    const [genus, setGenus] = useState("");
    const [flavorText, setFlavorText] = useState<IPokemonFlavorText[]>([]);

    const {findName, findArtwork, findFlavorText, findGenus} = useFetch();
    useEffect(() => {
        setArtwork(findArtwork(id!));

        // 포켓몬 cur, prev, next 이름 가져오기
        findName(id!)
            .then(res => setCurName(res!));
        if (Number(id) - 1 > 0) {
            findName(Number(id) - 1!)
                .then(res => setPrevName(res!));
        } else {
            setPrevName("");
        }
        if (Number(id) + 1 <= lastId) {
            findName(Number(id) + 1!)
                .then(res => setNextName(res!));
        } else {
            setNextName("");
        }

        findGenus(species)
            .then(res => setGenus(res!));

        findFlavorText(id!)
            .then(res => setFlavorText(res!));
    }, [id]);

    const flavorTextRows = flavorText.map((item) => (
        <Table.Tr key={item.version.name}>
            <Table.Th w={"20%"}>{VERSION_KO[item.version.name]}</Table.Th>
            <Table.Td>{item.flavor_text}</Table.Td>
        </Table.Tr>));

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
                            <Tabs.Tab value={"info"}>기본정보</Tabs.Tab>
                            <Tabs.Tab value={"flavorText"}>도감 설명</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value={"info"} pt={"1rem"}>
                            <Table>
                                <Table.Thead>
                                    <Text size={"1.2rem"} fw={"bold"}>{genus}</Text>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Th w={"20%"}>타입</Table.Th>
                                        <Table.Td>
                                            <TypeBtn types={detail.types}/>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>키</Table.Th>
                                        <Table.Td>{(detail.height / 10).toFixed(1)}m</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>몸무게</Table.Th>
                                        <Table.Td>{(detail.weight / 10).toFixed(1)}kg</Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
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