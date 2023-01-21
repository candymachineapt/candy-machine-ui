import {Card, Grid, Group, Text} from "@mantine/core";
import {AptosCollection} from "../services/aptos/client/AptosTypes";

interface CollectionProps extends AptosCollection {
}

export function Collection({collection_name, description, uri, maximum}: CollectionProps) {

    return (
        <Grid.Col span="content">
            <Card shadow="xs" p="xs" radius="md" withBorder>
                <Group position="center">
                    <Text weight={500}>{collection_name}</Text>
                </Group>

                <Text size="xs" color="dimmed">Uri: {uri}</Text>
                <Text size="xs" color="dimmed">Maximum: {maximum}</Text>
                <Text size="xs" color="dimmed">Description: {description}</Text>
            </Card>
        </Grid.Col>
    )
}