import {Flex, Title} from "@mantine/core";

function Error() {
    return (
        <Flex justify={"center"}
              align={"center"}
              style={{width: "100p%", height: "50vh"}}>
            <Title order={2}>해당 내역이 없습니다</Title>
        </Flex>
    );
}

export default Error;