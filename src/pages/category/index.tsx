import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Paper, SimpleGrid, Table} from "@mantine/core";
import {useRecoilValue} from "recoil";
import TypeSelect from "./components/TypeSelect.tsx";
import RegionSelect from "./components/RegionSelect.tsx";
import {IPokemonList} from "../../ts/interface/pokemons.interfaces.ts";
import {languageState} from "../../contexts/language.ts";
import {useQuery} from "@apollo/client";
import {GET_FILTERED_CONTENTS} from "../../services/queryPokemon.ts";
import PokemonList from "../../components/common/PokemonList.tsx";

function Category() {
    const language = useRecoilValue(languageState);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [types, setTypes] = useState<string[]>([]);
    const [region, setRegion] = useState("");
    const [totalData, setTotalData] = useState<IPokemonList>({pokemon: []});
    const [shouldUpdateData, setShouldUpdateData] = useState(true);

    const {data} = useQuery(GET_FILTERED_CONTENTS, {
        variables: {
            firstType: types[0] || "",
            secondType: types[1] || "",
            region: region || "",
            lan: language,
        },
        skip: !shouldUpdateData,
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
            setTotalData(data);
        }
    }, [data]);

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
                {searchParams.size > 0 &&
                    <PokemonList data={totalData}/>
                }
            </div>
        </>
    );
}

export default Category;