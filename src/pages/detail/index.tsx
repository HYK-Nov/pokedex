import {useLoaderData} from "react-router-dom";
import {
    IPokemonDetail, IPokemonSpecies,
} from "../../ts/interface/pokemons.interfaces.ts";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {Grid, Image, SimpleGrid, Tabs, Title} from "@mantine/core";
import {useRecoilValue} from "recoil";
import {lastIdState} from "../../contexts/lastId.ts";
import PrevNextBtn from "./components/PrevNextBtn.tsx";
import InfoTable from "./components/table/InfoTable.tsx";
import AbilityTable from "./components/table/AbilityTable.tsx";
import StatTable from "./components/table/StatTable.tsx";
import BreedingTable from "./components/table/BreedingTable.tsx";
import FlavorTextTable from "./components/table/FlavorTextTable.tsx";

interface ILoaderData {
    detail: IPokemonDetail;
    species: IPokemonSpecies;
}

function Detail() {
    const {detail, species} = useLoaderData() as ILoaderData;
    const id = detail.species.url.split("/").slice(6, 7).pop();
    const lastId = useRecoilValue(lastIdState);
    const [curTab, setCurTab] = useState<string | null>("info");
    const [artwork, setArtwork] = useState("");
    const [curName, setCurName] = useState("");
    const [prevName, setPrevName] = useState("");
    const [nextName, setNextName] = useState("");

    const {findName, findArtwork} = useFetch();
    useEffect(() => {
        // id 변경시, 탭 초기화
        setCurTab("info");

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
    }, [id]);

    return (
        <>
            <Title pb={"1rem"}>{curName}</Title>

            <Grid>
                <Grid.Col span={{base: 12, sm: 4}}>
                    <Image src={artwork} alt={curName}
                           w={"80%"}
                           m={"auto"}
                           fallbackSrc={`https://placehold.co/300x300?text=${detail.name}`}
                           loading={"lazy"}/>
                </Grid.Col>
                <Grid.Col span={"auto"}>
                    <SimpleGrid cols={3} pb={"1.5rem"}>
                        {prevName && <PrevNextBtn id={Number(id) - 1} name={prevName}/>}
                        <PrevNextBtn id={id!} name={curName} current/>
                        {nextName && <PrevNextBtn id={Number(id) + 1} name={nextName}/>}
                    </SimpleGrid>

                    <Tabs value={curTab} onChange={setCurTab}>
                        <Tabs.List grow>
                            <Tabs.Tab value={"info"}>정보</Tabs.Tab>
                            <Tabs.Tab value={"detail"}>세부 정보</Tabs.Tab>
                            <Tabs.Tab value={"flavorText"}>도감 설명</Tabs.Tab>
                        </Tabs.List>

                        {/* 정보 탭 */}
                        <Tabs.Panel value={"info"} pt={"1rem"}>
                            {/* 기본 정보 테이블 */}
                            <InfoTable detail={detail} species={species}/>

                            {/* 특성 테이블 */}
                            <AbilityTable detail={detail}/>
                        </Tabs.Panel>

                        {/* 세부 정보 탭 */}
                        <Tabs.Panel value={"detail"} pt={"1rem"}>
                            {/* 종족치 테이블 */}
                            <StatTable detail={detail}/>

                            {/* 유전 정보 테이블 */}
                            <BreedingTable species={species}/>
                        </Tabs.Panel>

                        {/* 도감 설명 탭 */}
                        <Tabs.Panel value={"flavorText"} pt={"1rem"}>
                            <FlavorTextTable species={species}/>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </>
    )
        ;
}

export default Detail;