import {Table} from "@mantine/core";
import {useEffect, useState} from "react";
import {IPokemonFlavorText, IPokemonSpecies} from "../../../../ts/interface/pokemons.interfaces.ts";
import {useFetch} from "../../../../hooks/useFetch.ts";
import {VERSION_KO} from "../../../../ts/types/pokemons.types.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../../contexts/language.ts";

function FlavorTextTable({species}: { species: IPokemonSpecies }) {
    const language = useRecoilValue(languageState);
    const [flavorText, setFlavorText] = useState<IPokemonFlavorText[]>([]);

    const {findFlavorTexts} = useFetch();
    useEffect(() => {
        // 도감 설명 가져오기
        findFlavorTexts(species)
            .then(res => setFlavorText(res!));
    }, [species, language]);

    // 도감 설명 테이블 열
    const flavorTextRows = flavorText.map((item) => (
        <Table.Tr key={item.version.name}>
            <Table.Th w={"20%"}>{language === "ko" ? VERSION_KO[item.version.name] : item.version.name}</Table.Th>
            <Table.Td>{item.flavor_text}</Table.Td>
        </Table.Tr>));

    return (
        <Table withColumnBorders>
            <Table.Thead></Table.Thead>
            <Table.Tbody>
                {flavorText.length > 0 && flavorTextRows}
            </Table.Tbody>
        </Table>
    );
}

export default FlavorTextTable;