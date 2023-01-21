import LifeCycleOfStates from "./LifeCycleOfStates";
import {Text, Group, Space, Title, Divider} from "@mantine/core";

export default function Concepts() {
    return (
        <>
        <Group position="apart">
            <Title order={2}>Concepts</Title>
        </Group>
        <Divider my="sm"/>
        <Space h="md"/>
        <Text>This page will be updated later..</Text>
        <Space h="md"/>
        <Title order={3}>Candy Machine States</Title>
        <Space h="md"/>
        <LifeCycleOfStates />
        </>
    )
}