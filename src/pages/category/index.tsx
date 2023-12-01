import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import PokemonList from "../../components/common/PokemonList.tsx";
import {Box, Button, SimpleGrid, Table} from "@mantine/core";
import {useRecoilState, useRecoilValue} from "recoil";
import TypeSelect from "./components/TypeSelect.tsx";
import RegionSelect from "./components/RegionSelect.tsx";
import {REGION_NUM} from "../../ts/types/pokemons.types.ts";
import Error from "../../exception/Error.tsx";
import {useQueries} from "@tanstack/react-query";
import {lastIdState} from "../../contexts/lastId.ts";

function Category() {
    const navigate = useNavigate();
    const lastId = useRecoilValue(lastIdState);
    const [searchParams] = useSearchParams();
    const [types, setTypes] = useState<string[]>([]);
    const [region, setRegion] = useState("");
    const [shouldUpdateData, setShouldUpdateData] = useState(true);

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

    const totalData = useQueries({
        queries: [
            {
                queryKey: ['typesResult', searchParams.get("type")],
                queryFn: () => findMatchType(types),
                enabled: shouldUpdateData,
            },
            {
                queryKey: ['regionResult', searchParams.get("region")],
                queryFn: () => findMatchRegion(REGION_NUM[region]),
                enabled: shouldUpdateData,
            },
        ],
        combine: (result) => {
            const [res1, res2] = result.map(({data}) => data || []);

            if (res1 && res2) {
                if (res1.length > 0 && res2.length > 0) {
                    return res1.filter(v1 => res2.find(v2 => (v1.name === v2.name) && (Number(v1.url.split("/")[6]) <= lastId)));
                } else {
                    return res1.length > 0 ?
                        res1.filter(v => Number(v.url.split("/")[6]) <= lastId) :
                        res2.filter(v => Number(v.url.split("/")[6]) <= lastId);
                }
            } else {
                return [];
            }
        }
    })

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

            <div style={{margin: "3rem auto", minHeight: "300px"}}>
                {(totalData.length === 0 && searchParams.size > 0) && <Error/>}
                {(totalData) && <PokemonList data={searchParams.size > 0 ? totalData : []}/>}
            </div>
        </>
    );
}

export default Category;