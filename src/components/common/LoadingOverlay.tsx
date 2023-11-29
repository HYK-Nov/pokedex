import {Loader, useMantineTheme} from "@mantine/core";

function LoadingOverlay() {
    const theme = useMantineTheme();

    return (
        <>
            <div style={{
                backgroundColor: theme.colors.red[6],
                height: window.innerHeight,
                width: window.innerWidth,
                position: "fixed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000000
            }}>
                <Loader color={"white"} size={"300px"} style={{backgroundColor: "white", borderRadius: "300px"}}/>
            </div>
        </>
    );
}

export default LoadingOverlay;