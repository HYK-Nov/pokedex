import {Container} from "@mantine/core";
import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import ScrollToTopBtn from "../common/ScrollToTopBtn.tsx";

function Layout() {
    return (
        <>
            <Header/>
            <div style={{position: "fixed", zIndex: "999", bottom: "2vh", right: "2vw"}}>
                <ScrollToTopBtn/>
            </div>
            <Container style={{margin: "4vh auto"}}>
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