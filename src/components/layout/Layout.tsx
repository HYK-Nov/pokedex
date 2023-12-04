import {Container} from "@mantine/core";
import {Outlet, useLocation} from "react-router-dom";
import Header from "./Header.tsx";
import ScrollToTopBtn from "../common/ScrollToTopBtn.tsx";
import {useEffect} from "react";

function Layout() {
    const {search, pathname} = useLocation();

    useEffect(() => {
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "auto"});
    }, [search, pathname]);

    return (
        <>
            <header>
                <Header/>
            </header>
            <div style={{position: "fixed", zIndex: "999", bottom: "2vh", right: "2vw"}}>
                <ScrollToTopBtn/>
            </div>
            <section style={{padding: "5vh 0", backgroundColor: "#f4f4f4", minHeight: window.innerHeight - 65}}>
                <Container size={"lg"}>
                    <Outlet/>
                </Container>
            </section>
        </>
    );
}

export default Layout;