import {Container} from "@mantine/core";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <header>
                <Container>
                    Header
                </Container>
            </header>
            <div style={{margin:"5vh auto"}}>
                <Outlet/>
            </div>
            <footer>
                <Container>
                    Footer
                </Container>
            </footer>
        </>
    );
}

export default Layout;