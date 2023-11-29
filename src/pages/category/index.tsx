import {Outlet, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {IPokemon} from "../../ts/interface/pokemons.interfaces.ts";
import PokemonList from "../../components/common/PokemonList.tsx";
import {Box, Button, SimpleGrid} from "@mantine/core";
import {useRecoilState} from "recoil";
import {loadingState} from "../../contexts/loading.ts";
import TypeSelect from "./components/TypeSelect.tsx";
import LoadingSkeleton from "../../components/common/LoadingSkeleton.tsx";


function Category() {
    const navigate = useNavigate();
    const [skeleton, setSkeleton] = useRecoilState(loadingState);
    const [searchParams] = useSearchParams();
    const [types, setTypes] = useState<string[]>([]);
    const [data, setData] = useState<IPokemon[]>([]);
    const [shouldUpdateData, setShouldUpdateData] = useState(true);

    const {findMatchType} = useFetch();
    const searchTypes = async (types: string[]) => {
        try {
            setSkeleton(true);
            findMatchType(types)
                .then((res) => {
                    if (res) {
                        setData(res);
                    }
                });
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setSkeleton(false);
            }, 1000);
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

    const handleResetClick = () => {
        setShouldUpdateData(false);
        setTypes([]);
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
            searchTypes(types);
        }
    }, [types]);

    return (
        <>
            <Box bg={"white"}>
                <TypeSelect types={types} onClick={handleTypeClick}/>
                <SimpleGrid cols={2} mb={"2rem"}>
                    <Button variant={"outline"} color={"#aaaaaa"} onClick={handleResetClick}>초기화</Button>
                    <Button
                        onClick={() => navigate(`/category${generateParams(types)}`)}>검색</Button>
                </SimpleGrid>
            </Box>
            {(skeleton && searchParams.size > 0) && <LoadingSkeleton/>}
            {(!skeleton && data.length > 0) && <PokemonList data={data}/>}
            <Outlet/>
        </>
    );
}

export default Category;