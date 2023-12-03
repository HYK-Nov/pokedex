import {useNavigate, useSearchParams} from "react-router-dom";
import {lazy, Suspense, useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {Button, Paper, SimpleGrid, Table} from "@mantine/core";
import {useRecoilValue} from "recoil";
import TypeSelect from "./components/TypeSelect.tsx";
import RegionSelect from "./components/RegionSelect.tsx";
import {REGION_NUM} from "../../ts/types/pokemons.types.ts";
import {useQuery} from "@tanstack/react-query";
import {lastIdState} from "../../contexts/lastId.ts";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import LoadingSkeleton from "../../components/common/LoadingSkeleton.tsx";
import {languageState} from "../../contexts/language.ts";

const PokemonList = lazy(() => import("../../components/common/PokemonList.tsx"));

function Category() {
    const language = useRecoilValue(languageState);
    const navigate = useNavigate();
    const lastId = useRecoilValue(lastIdState);
    const [searchParams] = useSearchParams();
    const [types, setTypes] = useState<string[]>([]);
    const [region, setRegion] = useState("");
    const [totalData, setTotalData] = useState<IPokemon[]>([]);
    const [shouldUpdateData, setShouldUpdateData] = useState(true);

    const {findMatchType, findMatchRegion} = useFetch();
    const {data: typesResult} = useQuery({
        queryKey: ['typesResult', types],
        queryFn: () => findMatchType(types),
        enabled: shouldUpdateData,
        initialData: [],
    });
    const {data: regionResult} = useQuery({
        queryKey: ['regionResult', region],
        queryFn: () => findMatchRegion(REGION_NUM[region]),
        enabled: shouldUpdateData,
        initialData: [],
    })

    const generateParams = (types: string[], region: string) => {
        if (types.length === 0 && region === "") {
            return "";
        }

        let result = "?";

        if (types.length > 0) {
            result += `type=${types.join(",")}`;
        }

        if (region !== "") {
            result += `${types.length > 0 ? "&" : ""}region=${region}`;
        }

        return result;
    };

    const handleTypeClick = (item: string) => {
        setShouldUpdateData(false);
        if (types.length < 2) {
            setTypes(prev => [...prev, item]);
        }
        if (types.includes(item)) {
            setTypes(prev => prev.filter((item2) => item2 !== item))
        }
    }

    const handleRegionClick = (item: string) => {
        setShouldUpdateData(false);
        if (region === item) {
            setRegion("");
        } else {
            setRegion(item);
        }
    }

    const handleResetClick = () => {
        setShouldUpdateData(false);
        setTypes([]);
        setRegion("");
    }

    useEffect(() => {
        const typeParams = searchParams.get("type");
        const regionParams = searchParams.get("region");
        setShouldUpdateData(true);
        setTotalData([]);

        if (typeParams && typeParams.length > 0) {
            const newTypes = typeParams!.split(",") || [];
            setTypes([...new Set(newTypes)]);
        } else {
            setTypes([]);
        }

        if (regionParams && regionParams.length > 0) {
            setRegion(regionParams);
        } else {
            setRegion("");
        }
    }, [searchParams]);

    useEffect(() => {
        if (shouldUpdateData) {
            if (typesResult.length > 0 && regionResult.length > 0) {
                setTotalData(typesResult.filter(v1 => regionResult.find(v2 => (v1.name === v2.name) && (Number(v1.url.split("/")[6]) <= lastId))));
            } else if (typesResult.length > 0) {
                setTotalData(typesResult.filter(v => Number(v.url.split("/")[6]) <= lastId));
            } else if (regionResult.length > 0) {
                setTotalData(regionResult.filter(v => Number(v.url.split("/")[6]) <= lastId));
            }
        }
    }, [typesResult, regionResult]);

    return (
        <>
            <Paper bg={"white"} style={{padding: "5vh"}} withBorder>
                <Table>
                    <Table.Thead></Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Th style={{textAlign: "center", width: "10%", fontSize: "1.1rem"}}>
                                {language === "ko" ? "타입" : "Type"}
                            </Table.Th>
                            <Table.Td>
                                <TypeSelect types={types} onClick={handleTypeClick}/>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th style={{textAlign: "center", width: "10%", fontSize: "1.1rem"}}>
                                {language === "ko" ? "지역" : "Region"}
                            </Table.Th>
                            <Table.Td>
                                <RegionSelect region={region} onClick={handleRegionClick}/>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <SimpleGrid cols={2}>
                    <Button variant={"outline"} color={"#aaaaaa"} onClick={handleResetClick}>
                        {language === "ko" ? "초기화" : "Reset"}
                    </Button>
                    <Button
                        onClick={() => navigate(`/category${generateParams(types, region)}`)}>
                        {language === "ko" ? "검색" : "Search"}
                    </Button>
                </SimpleGrid>
            </Paper>

            <div style={{margin: "3rem auto"}}>
                <Suspense fallback={<LoadingSkeleton/>}>
                    <PokemonList data={totalData}/>
                </Suspense>
            </div>
        </>
    );
}

export default Category;