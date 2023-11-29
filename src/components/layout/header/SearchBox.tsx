import {Select} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useFetch} from "../../../hooks/useFetch.ts";

interface IData {
    value: string;
    label: string;
}

function SearchBox() {
    const navigate = useNavigate();
    const location = useLocation();
    const ref = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string | null>("");
    const [data, setData] = useState<IData[]>([]);

    const {findNameList} = useFetch();
    useEffect(() => {
        findNameList()
            .then((res) => setData(res));
    }, []);

    const handleOptionSubmit = (id: string) => {
        setValue(null);
        // 포커스 아웃
        if (ref.current) {
            ref.current.blur();
        }
        navigate(`/${id}`);
    }

    useEffect(() => {
        setValue(null);
    }, [location.pathname, value]);

    return (
        <Select
            searchable
            rightSection={<IconSearch/>}
            nothingFoundMessage={"Not Found"}
            maxDropdownHeight={200}
            data={data}
            ref={ref}
            value={value}
            onChange={setValue}
            onOptionSubmit={handleOptionSubmit}/>
    );
}

export default SearchBox;