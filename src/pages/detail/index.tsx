import {useLocation} from "react-router-dom";
import {IPokemonNames} from "../../ts/interface/pokemons.interfaces.ts";
import {useEffect, useState} from "react";
import {Grid, Image, LoadingOverlay, Paper, SimpleGrid, Tabs} from "@mantine/core";
import {useRecoilValue} from "recoil";
import PrevNextBtn from "./components/PrevNextBtn.tsx";
import InfoTable from "./components/table/InfoTable.tsx";
import AbilityTable from "./components/table/AbilityTable.tsx";
import StatTable from "./components/table/StatTable.tsx";
import BreedingTable from "./components/table/BreedingTable.tsx";
import FlavorTextTable from "./components/table/FlavorTextTable.tsx";
import {languageState} from "../../contexts/language.ts";
import placeholder from '../../assets/images/placeholder.webp';
import {useQuery} from '@apollo/client';
import {GET_PKM_DETAIL, GET_PREV_NEXT_NAME} from "../../services/queryPokemon.ts";

function Detail() {
    const language = useRecoilValue(languageState);
    const location = useLocation();
    const id = Number(location.pathname.slice(1));
    const [curTab, setCurTab] = useState<string | null>("info");

    const {data, refetch, loading} = useQuery<any>(GET_PKM_DETAIL, {
        variables: {
            id: id,
            lan: language,
        }
    });

    // 포켓몬 prev, cur, next 이름 가져오기
    const {data: nameData, refetch: nameRefetch} = useQuery<IPokemonNames>(GET_PREV_NEXT_NAME, {
        variables: {
            prevId: id - 1,
            nextId: id + 1,
            lan: language,
        }
    })

    const name = data?.pokemon[0].specy.names.find((item: any) => item.language.name === language).name;

    useEffect(() => {
        // id 변경시, 탭 초기화
        setCurTab("info");
    }, [id]);

    useEffect(() => {
        refetch();
        nameRefetch();
    }, [language]);

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 1}}/>

            <Paper withBorder p={"2rem"} mih={"80vh"}>
                {data &&
                    <Grid>
                        <Grid.Col span={{base: 12, sm: 4}}>
                            <b style={{fontSize:'2rem'}}>{name}</b>
                            <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                                alt={name}
                                w={"70%"}
                                m={"auto"}
                                pt={"2rem"}
                                fallbackSrc={placeholder}
                            />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                            <SimpleGrid cols={3} pb={"1.5rem"}>
                                {nameData &&
                                    <>
                                        {/* prev */}
                                        {nameData.names[0].id === id - 1 ?
                                            <PrevNextBtn id={id - 1} name={nameData.names[0].name}/> : <div></div>}
                                        {/* cur */}
                                        <PrevNextBtn id={id}
                                                     name={nameData && nameData.names && nameData.names[1]?.id === id ? nameData.names[1]?.name : nameData.names[0]?.name}
                                                     current/>
                                        {/* next */}
                                        {nameData.names[1]?.id === id + 1 &&
                                            <PrevNextBtn id={id + 1} name={nameData.names[1]?.name}/>}
                                        {nameData.names[2]?.id === id + 1 &&
                                            <PrevNextBtn id={id + 1} name={nameData.names[2]?.name}/>}
                                    </>
                                }
                            </SimpleGrid>

                            <Tabs value={curTab} onChange={setCurTab}>
                                <Tabs.List grow>
                                    <Tabs.Tab value={"info"}>{language === "ko" ? "정보" : "Info"}</Tabs.Tab>
                                    <Tabs.Tab value={"detail"}>{language === "ko" ? "세부 정보" : "Detail"}</Tabs.Tab>
                                    <Tabs.Tab
                                        value={"flavorText"}>{language === "ko" ? "도감 설명" : "FlavorText"}</Tabs.Tab>
                                </Tabs.List>

                                {/* 정보 탭 */}
                                <Tabs.Panel value={"info"} pt={"1rem"}>
                                    {/* 기본 정보 테이블 */}
                                    <InfoTable pokemon={data.pokemon}/>

                                    {/* 특성 테이블 */}
                                    <AbilityTable ability={data.ability}/>
                                </Tabs.Panel>

                                {/* 세부 정보 탭 */}
                                <Tabs.Panel value={"detail"} pt={"1rem"}>
                                    {/* 종족치 테이블 */}
                                    <StatTable stat={data.stat}/>

                                    {/* 유전 정보 테이블 */}
                                    <BreedingTable pokemon={data.pokemon} growthRate={data.growth_rate}/>
                                </Tabs.Panel>

                                {/* 도감 설명 탭 */}
                                <Tabs.Panel value={"flavorText"} pt={"1rem"}>
                                    <FlavorTextTable flavorText={data.flavor_text}/>
                                </Tabs.Panel>
                            </Tabs>
                        </Grid.Col>
                    </Grid>
                }
            </Paper>
        </>
    )
}

export default Detail;