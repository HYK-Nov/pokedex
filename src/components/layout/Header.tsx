import {Button, Container} from "@mantine/core";
import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <>
            <Container>
                <Button onClick={() => navigate("/")}>Pokedex</Button>
            </Container>
        </>
    );
}

export default Header;