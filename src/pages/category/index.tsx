import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import PokemonList from "../../components/common/PokemonList.tsx";
import {Box, Button, SimpleGrid, Table} from "@mantine/core";
import {useRecoilState} from "recoil";
import {loadingState} from "../../contexts/loading.ts";
import TypeSelect from "./components/TypeSelect.tsx";
import LoadingSkeleton from "../../components/common/LoadingSkeleton.tsx";
import RegionSelect from "./components/RegionSelect.tsx";
import {REGION_NUM} from "../../ts/types/pokemons.types.ts";
import Error from "../../exception/Error.tsx";


function Category() {
    const navigate = useNavigate();
    const [skeleton, setSkeleton] = useRecoilState(loadingState);
    const [searchParams] = useSearchParams();
    const [types, setTypes] = useState<string[]>([]);
    const [region, setRegion] = useState("");
    const [totalData, setTotalData] = useState<IPokemon[]>([]);
    const [shouldUpdateData, setShouldUpdateData] = useState(true);
    const [nothingResult, setNothingResult] = useState(false);

    const {findMatchType, findMatchRegion} = useFetch();

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
        setNothingResult(false);
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
        if (shouldUpdateData && searchParams.size > 0) {
            setSkeleton(true);
            const fetchData = async () => {
                const [res1, res2] = await Promise.all([findMatchType(types), findMatchRegion(REGION_NUM[region])]);
                const result = res1.filter(v1 => res2.find(v2 => v1.name === v2.name));

                if (result.length > 0) {
                    setTotalData(result);
                } else if (res1.length > 0 && res2.length === 0) {
                    setTotalData(res1);
                } else if (res1.length === 0 && res2.length > 0) {
                    setTotalData(res2);
                } else {
                    setNothingResult(true);
                }
            }

            fetchData()
                .finally(() => {
                    setTimeout(() => {
                        setSkeleton(false);
                    }, 1000);
                });
        }
    }, [types, region]);

    return (
        <>
            <Box bg={"white"}>
                <Table>
                    <Table.Thead></Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Th>타입</Table.Th>
                            <Table.Td>
                                <TypeSelect types={types} onClick={handleTypeClick}/>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>지역</Table.Th>
                            <Table.Td>
                                <RegionSelect region={region} onClick={handleRegionClick}/>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <SimpleGrid cols={2} mb={"2rem"}>
                    <Button variant={"outline"} color={"#aaaaaa"} onClick={handleResetClick}>초기화</Button>
                    <Button
                        onClick={() => navigate(`/category${generateParams(types, region)}`)}>검색</Button>
                </SimpleGrid>
            </Box>

            <div style={{margin: "3rem auto"}}>
                {(skeleton && searchParams.size > 0) && <LoadingSkeleton/>}
                {(!skeleton && nothingResult) && <Error/>}
                {(!skeleton && totalData.length > 0) && <PokemonList data={totalData}/>}
            </div>
        </>
    );
}

export default Category;