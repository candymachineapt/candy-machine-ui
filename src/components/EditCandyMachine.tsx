import {
    Card,
    Text,
    Grid,
    Title,
    Space,
    Divider,
    Accordion,
    Group,
    Code
} from '@mantine/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useAptosClient from '../hooks/aptosClient/useAptosClient';
import {AptosCollection, AptosTokenData} from '../services/aptos/client/AptosTypes';
import addressOperation from '../utils/address'
import {CandyMachine} from "./CandyMachine";
import {Collections} from './Collections';
import {CreateCollectionButton} from './CreateCollectionButton';
import {CreateTokenButton} from './CreateTokenButton';
import { CreateTokensWithBaseUrl } from './CreateTokenWithBaseUrl';
import {TokenDatas} from "./TokenDatas";
import {UploadTokensFromFile} from "./UploadTokensFromFile";

export function EditCandyMachine() {
    const {candyMachineAddress} = useParams();
    const {tokenService} = useAptosClient();

    const [collections, setCollections] = useState([] as AptosCollection[]);

    const createCollectionCallback = useCallback(() => {
        if (!candyMachineAddress) return;

        tokenService.getCollections(candyMachineAddress).then((cols) => {
            setCollections(cols);
        });
    }, [tokenService, setCollections, candyMachineAddress]);

    useEffect(() => {
        createCollectionCallback();
    }, [createCollectionCallback]);

    const [tokenDatas, setTokenDatas] = useState([] as AptosTokenData[]);

    const refreshTokenDatas = useCallback(() => {
        if (!candyMachineAddress) return;

        tokenService.getTokenDatas(candyMachineAddress).then((tokenDatas) => {
            setTokenDatas(tokenDatas);
        });
    }, [tokenService, setTokenDatas, candyMachineAddress]);

    useEffect(() => {
        refreshTokenDatas();
    }, [refreshTokenDatas]);

    if (candyMachineAddress == null) {
        return (<Text>Candy Machine Address needed</Text>);
    }

    const json = `{
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "",
            "value": ""
        },
    ]
}`;

    return (
        <>
            <Title order={2}>Candy Machine [{addressOperation.mask(candyMachineAddress)}]</Title>
            <Divider my="sm"/>
            <Space h="md"/>
            <Grid justify="left">
                <Grid.Col span={3}>
                    <CandyMachine address={candyMachineAddress}/>
                </Grid.Col>
                <Grid.Col span={9}>
                    <Card shadow="sm" p="md" withBorder>
                        <Group position="apart">
                            <Title order={4}>Collections</Title>
                            <CreateCollectionButton candyMachineAddress={candyMachineAddress}
                                                    onCreatedCallback={createCollectionCallback}/>
                        </Group>
                        <Divider my="sm"/>
                        <Collections collections={collections}/>
                    </Card>

                    <Card shadow="sm" p="md" mt="md" withBorder>
                        <Group position="apart">
                            <Title order={4}>Import Tokens</Title>
                        </Group>
                        <Divider my="sm"/>

                        <Accordion variant="separated" chevronPosition="left">
                            <Accordion.Item value="1by1">
                                <Accordion.Control>Create one by one (On-chain)</Accordion.Control>
                                <Accordion.Panel>
                                    <Text>It allows to import to the candy machine one by one.</Text>
                                    <CreateTokenButton candyMachineAddress={candyMachineAddress}
                                                       collectionNames={collections}
                                                       onChangeCallback={refreshTokenDatas}/>
                                </Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item value="upload-file">
                                <Accordion.Control>Upload from file (Off-chain)</Accordion.Control>
                                <Accordion.Panel>
                                    <Text>It provides mass transfer of nfts you created in arwave or ifps via file
                                        containing nft url.</Text>
                                    <Text>Urls must be in json format and include the following fields.</Text>

                                    <Code block>{json}</Code>
                                    <Space h="md" />
                                    <UploadTokensFromFile collectionNames={collections}
                                                          candyMachineAddress={candyMachineAddress}
                                                          onChangeCallback={refreshTokenDatas}/>
                                </Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item value="with start index">
                                <Accordion.Control>Create with start/end url (Off-chain)</Accordion.Control>
                                <Accordion.Panel>
                                    <Text>It provides mass transfer of nfts you created in arwave or ifps via start and end nft urls.</Text>
                                    <Text>Urls must be in json format and include the following fields.</Text>
                                    <Code block>{json}</Code>
                                    
                                    <Space h="md" />
                                    <CreateTokensWithBaseUrl collectionNames={collections}
                                                          candyMachineAddress={candyMachineAddress}
                                                          onChangeCallback={refreshTokenDatas}/>
                                </Accordion.Panel>
                            </Accordion.Item>                            
                        </Accordion>

                    </Card>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Card shadow="sm" p="xl" withBorder>
                        <Group position="apart">
                            <Title order={4}>Tokens (Currently Last 25)</Title>
                        </Group>
                        <Divider my="sm"/>
                        <TokenDatas tokenDatas={tokenDatas}/>
                    </Card>
                </Grid.Col>
            </Grid>
        </>
    );
}