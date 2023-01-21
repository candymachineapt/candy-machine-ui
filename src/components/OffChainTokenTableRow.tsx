import React from "react";
import {Group, Image, Text, Card, Grid} from "@mantine/core";

interface OffChainTokenTableRowData{
    name: string;
    description: string;
    uri: string;
    property_keys: string[],
    property_values: string[],
    property_types: string[]
}

export function OffChainTokenTableRow({
                              name,
                              description,
                              uri,
                              property_keys,
                              property_types,
                              property_values
                          }: OffChainTokenTableRowData) {

    return (
        <tr key={name}>
            <td>
                <Image
                    height={80}
                    fit="contain"
                    src={uri}
                    withPlaceholder
                />
            </td>
            <td>{name}</td>
            <td>{description}</td>
            <td>{attributesComponent(property_keys, property_types, property_values)}</td>
        </tr>
    )
}

function attributesComponent(property_keys: string[], property_types: string[], property_values: string[]) {
    const comps = [];
    for (let i = 0; i < property_keys.length; i++) {
        const key = property_keys[i];
        const value = property_values[i];
        const type = property_types[i];

        const comp = attributeComponent(key, value, type);
        comps.push(comp);
    }


    return (
        <Grid>
            {comps}
        </Grid>
    );
}

function attributeComponent(key: string, value: string, type: string) {
    return (
        <Grid.Col span="content">
            <Card shadow="sm" p="xs" radius="md" withBorder>
                <Group position="left">
                    <Text weight={500}>{key}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                    {value}
                </Text>
            </Card>
        </Grid.Col>
    )
}