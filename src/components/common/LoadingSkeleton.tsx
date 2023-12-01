import {SimpleGrid, Skeleton} from "@mantine/core";

function LoadingSkeleton() {
    const items = Array.from({length: 15}, (_, idx) =>
        <Skeleton width={"100%"} height={"50vh"} key={idx}/>);

    return (
        <SimpleGrid cols={{base: 1, sm: 3, md: 4}}>
            {items}
        </SimpleGrid>
    );
}

export default LoadingSkeleton;