import {ActionIcon, Button, Input, Modal, ScrollArea, Stack} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useMediaQuery} from "@mantine/hooks";
import {useQuery} from "@tanstack/react-query";
import {useFetch} from "../../../hooks/useFetch.ts";

function SearchBox() {
    const isMobile = useMediaQuery(`(max-width: 36em)`);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const {findNameList} = useFetch();
    const {data} = useQuery({
        queryKey: ['searchList'],
        queryFn: () => findNameList(),
        initialData: [],
    });

    const handleModalClose = () => {
        setOpen(prev => !prev);
        setSearchKeyword("");
    }

    const items = data!.filter((item) =>
        item.name?.match(new RegExp(searchKeyword)))
        .map((item) => (
            <Button key={item.id}
                    variant={"subtle"}
                    fullWidth
                    styles={{inner: {display: 'flex', justifyContent: 'left'}}}
                    onClick={() => {
                        handleModalClose();
                        navigate(`/${item!.id}`);
                    }}>
                {item!.name}
            </Button>
        ))

    return (
        <>
            <Modal opened={open}
                   onClose={handleModalClose}
                   size={isMobile ? "100%" : "75%"}
                   withCloseButton={false}
                   scrollAreaComponent={ScrollArea.Autosize}
                   zIndex={100000}>
                <div style={{height: "25rem"}}>
                    <Input value={searchKeyword}
                           onChange={e => setSearchKeyword(e.target.value)}/>
                    <Stack gap={"0.5rem"} m={"1rem auto"}>
                        {items}
                    </Stack>
                </div>
            </Modal>

            {
                isMobile ?
                    <ActionIcon variant={"transparent"}
                                onClick={() => setOpen(true)}>
                        <IconSearch color={"white"} size={"1.8rem"}/>
                    </ActionIcon>
                    : <Input component={"button"}
                             pointer
                             w={"200px"}
                             leftSection={<IconSearch color={"var(--mantine-color-red-filled)"}/>}
                             onClick={() => setOpen(true)}/>
            }
        </>
    )
        ;
}

export default SearchBox;