import React, {useEffect, useRef, useState} from "react";
import {ActionIcon, Button, Input, Modal, ScrollArea, Stack} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mantine/hooks";
import {useFetch} from "../../../hooks/useFetch.ts";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import style from "../../../styles/SearchBox.module.scss";
import {useQuery} from "@apollo/client";
import {GET_ALL_NAMES} from "../../../services/queryPokemon.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../contexts/language.ts";
import {lastIdState} from "../../../contexts/lastId.ts";
import {IPokemonNames} from "../../../ts/interface/pokemons.interfaces.ts";

function SearchBox() {
    const language = useRecoilValue(languageState);
    const lastId = useRecoilValue(lastIdState);
    const isMobile = useMediaQuery(`(max-width: 36em)`);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isAutoSearch, setIsAutoSearch] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [autoSearchKeyword, setAutoSearchKeyword] = useState("");
    const [focusIdx, setFocusIdx] = useState(-1);
    const focusRef = useRef<HTMLButtonElement | null>(null);
    const debouncedKeyword = useDebounce(searchKeyword, 200);

    const {findNameList} = useFetch();
    /*const {data} = useQuery({
        queryKey: ['searchList', debouncedKeyword],
        queryFn: () => findNameList(debouncedKeyword),
        enabled: !!debouncedKeyword && !isAutoSearch,
        initialData: [],
        select: (res) => (res?.length && res.length > 10 ? res.slice(0, 9) : res) || [],
    });*/

    const {data} = useQuery<IPokemonNames>(GET_ALL_NAMES, {
        variables: {
            lastId: lastId,
            lan: language,
        },
    })

    const handleModalClose = () => {
        setOpen(prev => !prev);
        setSearchKeyword("");
        setAutoSearchKeyword("");
        setIsAutoSearch(false);
        setFocusIdx(-1);
    }

    const changeSelectItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (data?.names.length === 0) return;

        const lastIndex = data?.names.length - 1;

        switch (e.key) {
            case 'ArrowDown':
                setFocusIdx((prev) => (prev < lastIndex ? prev + 1 : -1));
                break;
            case 'ArrowUp':
                setFocusIdx((prev) => (prev === -1 ? lastIndex : prev - 1));
                break;
            case 'Escape':
                handleModalClose();
                break;
            case 'Enter':
                if (focusIdx >= 0 && focusIdx <= lastIndex) {
                    focusRef?.current?.click();
                }
                break;
            default:
                break;
        }
    }

    const items = data?.names.map((item, idx) => (
        <Button key={idx}
                variant={"subtle"}
                fullWidth
                ref={focusIdx === idx ? focusRef : undefined}
                styles={{inner: {display: 'flex', justifyContent: 'left'}}}
                className={`${style.item} ${focusIdx === idx && style.active}`}
                onClick={() => {
                    handleModalClose();
                    navigate(`/${item!.id}`);
                }}>
            {item!.name}
        </Button>
    ))

    useEffect(() => {
        setIsAutoSearch(focusIdx !== -1);
        setAutoSearchKeyword(focusIdx !== -1 ? data![focusIdx]!.name : '');
    }, [focusIdx, data]);

    return (
        <>
            <Modal.Root opened={open}
                        onClose={handleModalClose}
                        zIndex={100000}
                        size={isMobile ? "100%" : "75%"}
                        scrollAreaComponent={ScrollArea.Autosize}>
                <Modal.Overlay/>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title w={"100%"}>
                            <Input value={isAutoSearch ? autoSearchKeyword : searchKeyword}
                                   onKeyDown={changeSelectItem}
                                   onChange={e => {
                                       setSearchKeyword(e.target.value);
                                       setIsAutoSearch(false);
                                   }}/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stack gap={"0.3rem"} m={"1rem auto"}>
                            {items}
                        </Stack>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>

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