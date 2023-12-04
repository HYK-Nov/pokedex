import {SimpleGrid, Skeleton} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";

function LoadingSkeleton() {
    const isMobile = useMediaQuery(`(max-width: 36em)`);
    const items = Array.from({length: isMobile ? 3 : 8}, (_, idx) =>
        <Skeleton width={"100%"} mih={"300px"} mah={"350px"} key={idx}/>);

    return (
        <SimpleGrid cols={{base: 1, sm: 2, md: 4}}>
            {items}
        </SimpleGrid>
    );
}

export default LoadingSkeleton;