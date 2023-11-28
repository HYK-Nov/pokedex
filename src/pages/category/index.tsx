import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import PokemonList from "../main/components/PokemonList.tsx";
import {Box, Button, SimpleGrid} from "@mantine/core";
import {useSetRecoilState} from "recoil";
import {loadingState} from "../../contexts/loading.ts";
import TypeSelect from "./components/TypeSelect.tsx";


function Category() {
    const navigate = useNavigate();
    const setLoadingOverlay = useSetRecoilState(loadingState);
    const [searchParams] = useSearchParams();
    const [types, setTypes] = useState<string[]>([]);
    const [data, setData] = useState<IPokemon[]>([]);
    const [shouldUpdateData, setShouldUpdateData] = useState(true);

    const {findMatchType} = useFetch();
    const searchTypes = async () => {
        try {
            if (types.length === 1) {
                setLoadingOverlay(true);

                const res = await findMatchType(types[0]);
                if (res.length === 0) {
                    throw Error;
                }

                setData(res);
            } else if (types.length === 2) {
                setLoadingOverlay(true);

                const [res1, res2] = await Promise.all([findMatchType(types[0]), findMatchType(types[1])]);
                const intersection = res1.filter((v1) => res2.find((v2) => v1.name === v2.name));
                setData(intersection);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setLoadingOverlay(false);
            }, 500);
        }
    };

    const generateParams = (types: string[]) => {
        return types.length === 1 ? `?type=${types[0]}` : types.length > 1 ? `?type=${types.join(",")}` : "";
    }

    const handleTypeClick = (item: string) => {
        setShouldUpdateData(false);
        if (types.length < 2) {
            setTypes(prev => [...prev, item]);
        }
        if (types.includes(item)) {
            setTypes(prev => prev.filter((item2) => item2 !== item))
        }
    }

    useEffect(() => {
        const params = searchParams.get("type");
        setShouldUpdateData(true);

        if (params && params!.length > 0) {
            const newTypes = params!.split(",") || [];
            setTypes([...new Set(newTypes)]);
        } else {
            setData([]);
            setTypes([]);
        }
    }, [searchParams]);

    useEffect(() => {
        if (shouldUpdateData) {
            searchTypes();
        }
    }, [shouldUpdateData, types]);

    return (
        <>
            <Box bg={"white"}>
                <TypeSelect types={types} onClick={handleTypeClick}/>
                <SimpleGrid cols={2} mb={"2rem"}>
                    <Button variant={"outline"} color={"#aaaaaa"} onClick={() => {
                        setTypes([]);
                        setData([]);
                    }}>초기화</Button>
                    <Button
                        onClick={() => navigate(`/category${generateParams(types)}`)}>검색</Button>
                </SimpleGrid>
            </Box>
            {data.length > 0 && <PokemonList data={data}/>}
        </>
    );
}

export default Category;