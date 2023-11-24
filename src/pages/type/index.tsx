import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {TYPE_KO} from "../../ts/types/pokemons.types.ts";

function Type() {
    const [searchParams] = useSearchParams();
    const [types, setTypes] = useState<string[]>([]);

    useEffect(() => {
        if (searchParams.size > 0){
            const newTypes = searchParams.get("type")!.split(",") || [];
            setTypes([... new Set(newTypes)]);
        }
    }, [searchParams]);

    return (
        <>
            {types.length > 0 && types.map(item => ` ${TYPE_KO[item]}`)}
        </>
    );
}

export default Type;