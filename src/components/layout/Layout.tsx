import {Container} from "@mantine/core";
import {Outlet, useLocation} from "react-router-dom";
import Header from "./Header.tsx";
import ScrollToTopBtn from "../common/ScrollToTopBtn.tsx";
import {useEffect} from "react";

function Layout() {
    const {search} = useLocation();

    useEffect(() => {
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "auto"});
    }, [search]);

    return (
        <>
            <Header/>
            <div style={{position: "fixed", zIndex: "999", bottom: "2vh", right: "2vw"}}>
                <ScrollToTopBtn/>
            </div>
            <Container style={{margin: "4vh auto"}} size={"lg"}>
                <Outlet/>
            </Container>
            <footer>
                <Container>
                    Footer
                </Container>
            </footer>
        </>
    );
}

export default Layout;