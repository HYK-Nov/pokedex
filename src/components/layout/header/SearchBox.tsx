import React, {useEffect, useMemo, useRef, useState} from "react";
import {ActionIcon, Button, Input, Modal, ScrollArea, Stack} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mantine/hooks";
import style from "../../../styles/SearchBox.module.scss";
import {useQuery} from "@apollo/client";
import {GET_ALL_NAMES} from "../../../services/queryPokemon.ts";
import {useRecoilValue} from "recoil";
import {languageState} from "../../../contexts/language.ts";
import {lastIdState} from "../../../contexts/lastId.ts";
import {IPokemonName, IPokemonNames} from "../../../ts/interface/pokemons.interfaces.ts";

function SearchBox() {
    const language = useRecoilValue(languageState);
    const lastId = useRecoilValue(lastIdState);
    const isMobile = useMediaQuery(`(max-width: 36em)`);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [filteredData, setFilteredData] = useState<IPokemonName[]>();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [focusIdx, setFocusIdx] = useState(-1);
    const focusRef = useRef<HTMLButtonElement | null>(null);

    const {data, refetch} = useQuery<IPokemonNames>(GET_ALL_NAMES, {
        variables: {
            lastId: lastId,
            lan: language,
        },
    })

    useEffect(() => {
        refetch();
    }, [language]);

    const handleModalClose = () => {
        setOpen(prev => !prev);
        setSearchKeyword("");
        setFocusIdx(-1);
    }

    const changeSelectItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (filteredData?.length === 0) return;

        const lastIndex = filteredData!.length - 1;

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

    const items = useMemo(() => {
        if (filteredData) {
            return filteredData.map((item, idx) => {
                // if (idx > 9) return;

                return (
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
                )
            })
        }
    }, [filteredData, focusIdx]);

    useEffect(() => {
        if (searchKeyword) {
            const res = data?.names.filter(item => new RegExp(searchKeyword, "i").test(item.name));
            setFilteredData(res);
        } else {
            setFilteredData([]);
        }
    }, [searchKeyword]);

    useEffect(() => {
        setFocusIdx(-1);
    }, [filteredData]);

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
                            <Input onKeyDown={changeSelectItem}
                                   onChange={e => {
                                       setSearchKeyword(e.target.value);
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