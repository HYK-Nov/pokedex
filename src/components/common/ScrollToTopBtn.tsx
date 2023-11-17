import {Button} from "@mantine/core";
import {useEffect, useState} from "react";

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
                <Button onClick={scrollToTop}></Button>
            }
        </>
    );
}

export default ScrollToTopBtn;