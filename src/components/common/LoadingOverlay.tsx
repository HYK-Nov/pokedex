import {Loader, useMantineTheme} from "@mantine/core";
import {useRecoilValue} from "recoil";
import {loadingState} from "../../contexts/loading.ts";

function LoadingOverlay() {
    const theme = useMantineTheme();
    const loading = useRecoilValue(loadingState);

    return (
        <>
            {loading &&
                <div style={{
                    backgroundColor: theme.colors.red[6],
                    height: window.innerHeight,
                    width: window.innerWidth,
                    position: "fixed",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10000
                }}>
                    <Loader color={"white"} size={"300px"} style={{backgroundColor: "white", borderRadius: "300px"}}/>
                </div>
            }
        </>
    );
}

export default LoadingOverlay;