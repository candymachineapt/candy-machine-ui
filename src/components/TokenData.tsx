import React from "react";
import {AptosTokenData} from '../services/aptos/client/AptosTypes';
import {ActionIcon, CopyButton, Group, Image, Tooltip, Text, Card, Grid} from "@mantine/core";
import {IconCheck, IconCopy} from "@tabler/icons";
import addressOperation from "../utils/address";

interface TokenDataProps extends AptosTokenData {
}

export function TokenData({
                              id,
                              uri,
                              description,
                              name,
                              maximum,
                              royalty_points_numerator,
                              royalty_points_denominator,
                              royalty_payee_address,
                              property_keys,
                              property_types,
                              property_values
                          }: TokenDataProps) {

    return (
        <tr key={id.name}>
            <td>
                <Image
                    height={80}
                    fit="contain"
                    src={uri}
                    withPlaceholder
                />
            </td>
            <td>{id.collection}</td>
            <td>{name}</td>
            <td>{maximum}</td>
            <td>{description}</td>
            <td>% {(royalty_points_numerator / royalty_points_denominator * 100).toFixed(1)} </td>
            <td>{copyText(royalty_payee_address)}</td>
            <td>{attributesComponent(property_keys, property_types, property_values)}</td>
        </tr>
    )
}

function copyText(address: string) {
    const maskedAddress = addressOperation.mask(address);

    return (
        <CopyButton value={address} timeout={2000}>
            {({copied, copy}) => (
                <Group position="left" mt="md" mb="xs">
                    <Text weight={50}>{maskedAddress}</Text>
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon aria-label={maskedAddress} color={copied ? 'teal' : 'gray'} onClick={copy}>
                            {copied ? <IconCheck size={16}/> : <IconCopy size={16}/>}
                        </ActionIcon>
                    </Tooltip>
                </Group>
            )}
        </CopyButton>
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