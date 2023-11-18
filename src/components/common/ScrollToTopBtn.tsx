import {ActionIcon} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconArrowBarToUp} from "@tabler/icons-react";

function ScrollToTopBtn() {
    const [showButton, setShowButton] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        const handleShowButton = () => {
            setShowButton(window.scrollY >= window.innerHeight);
        }
        window.addEventListener("scroll", handleShowButton);
        return () => {
            window.removeEventListener("scroll", handleShowButton);
        }
    }, []);

    return (
        <>
            {showButton &&
                <ActionIcon size={"3.5rem"} radius={"xl"} variant={"outline"} onClick={scrollToTop}>
                    <IconArrowBarToUp/>
                </ActionIcon>
            }
        </>
    );
}

export default ScrollToTopBtn;