import {
    Box,
    Button,
    Card,
    Divider,
    FileButton,
    Group,
    Modal,
    Portal,
    Select,
    Slider,
    Space,
    Text,
    TextInput
} from "@mantine/core";
import React from "react";
import {useRef, useState} from "react";
import {AptosCollection, AptosTokenData, CreateTokenRequest, TokenProperty} from "../services/aptos/client/AptosTypes";
import axios from 'axios';
import {useDisclosure, useListState} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {OffChainTokenTable} from "./OffChainTokenTable";
import { EntryFunctionPayload } from "../services/CommonTypes";
import { OffChainTokenData } from "../types/SharedTypes";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export interface UploadTokensFromFileProps {
    collectionNames: AptosCollection[];
    candyMachineAddress: string,
    onChangeCallback: Function,
}

export function UploadTokensFromFile({collectionNames, candyMachineAddress, onChangeCallback}: UploadTokensFromFileProps) {
    const {account, signAndSubmitTransaction} = useWallet();
    const {candyMachineService, client} = useAptosClient();
    const [tokenDataList, handlers] = useListState([] as AptosTokenData[]);
    const [opened, {close, open}] = useDisclosure(false);
    const [selectedCollectionName, setSelectedCollectionName] = useState<string | null>(null);
    const [feeValue, setFeeValue] = useState(200);

    const form = useForm({
        initialValues: {
            tokenRoyaltyPayeeAddress: '',
        }
    });

    const [file, setFile] = useState<File | null>(null);
    const resetRef = useRef<() => void>(null);

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
        handlers.setState([] as AptosTokenData[]);
    };

    React.useEffect(() => {
        if (account?.address === null || account?.address === undefined) return;
        form.setFieldValue('tokenRoyaltyPayeeAddress', account.address.toString());
    }, [account]);

    React.useEffect(() => {
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            const text = (e.target?.result) as string;
            const urlList = text.split(/\r?\n/);

            urlList.forEach(function (url) {
                getTokenData(url);
            });
        };
        reader.readAsText(file);
    }, [file]);

    const getTokenData = (url: string) => {
        axios.get<OffChainTokenData>(
            url,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        ).then(({data}) => {
            const record = {
                id: {
                    creator: "",
                    collection: "",
                    name: data.name,
                },
                name: data.name,
                description: data.description,
                maximum: 1,
                uri: data.image,
                royalty_payee_address: '',
                royalty_points_denominator: 10000,
                royalty_points_numerator: 0,
                property_keys: data.attributes.map(a => a.trait_type),
                property_values: data.attributes.map(a => a.value),
                property_types: data.attributes.map(a => "u8[]")
            } as AptosTokenData;

            handlers.append(record);
        }).catch((e) => {
            console.log(e);
            //TODO something
        });
    };


    const ref = React.createRef<HTMLButtonElement>();

    const createTokens = async (values: any) => {
        if (!ref.current) return;
        if (account?.address === null || account?.address === undefined) return;
        if (!selectedCollectionName) return;

        const numerator = feeValue;
        const denominator = 10000;
        let request: CreateTokenRequest[] = [];

        tokenDataList.forEach((token) => {
            let propertiezz: TokenProperty[] = [];
            for (let index = 0; index < token.property_keys.length; index++) {
                const property = {
                    key: token.property_keys[index],
                    value: token.property_values[index],
                } as TokenProperty;
                propertiezz = [
                    ...propertiezz,
                    property
                ];
            }

            const tokenRequest: CreateTokenRequest = {
                candyMachineAddress: candyMachineAddress,
                collectionName: selectedCollectionName,
                name: token.name,
                description: token.description,
                maximum: 1,
                royaltyPayeeAddress: values.tokenRoyaltyPayeeAddress,
                royaltyPointsDenominator: denominator,
                royaltyPointsNumerator: numerator,
                uri: token.uri,
                properties: propertiezz
            };

            request = [
                ...request,
                tokenRequest,
            ];
        });

        console.log(request);
        const payload: EntryFunctionPayload = candyMachineService.createTokensPayload(request);

        try {
            const transactionHash = await signAndSubmitTransaction(payload);
            await client.waitForTransactionWithResult(transactionHash.hash);

            handlers.setState([] as AptosTokenData[]);
            onChangeCallback();
            close();
        } catch (error) {
            // see "Errors"
            // TODO: toast
        }
    };


    return (
        <>
            <Card shadow="sm" p="xl" withBorder>
                <FileButton resetRef={resetRef} onChange={setFile}>
                    {(props) => <Button variant="light" disabled={!!file} fullWidth {...props}>Upload File</Button>}
                </FileButton>
                <Space h="md"></Space>
                <Button fullWidth variant="light" disabled={!file} onClick={open} color="teal">Edit & Save</Button>
                <Space h="md"></Space>
                <Button fullWidth variant="light" disabled={!file} color="red" onClick={clearFile}>Clear</Button>
                {file && (
                    <Text size="sm" align="center" mt="sm">
                        Picked file: {file.name}
                    </Text>
                )}
                <Space h="md"></Space>
                <OffChainTokenTable header={true} paging={true} tokenDatas={tokenDataList}/>
            </Card>
            <Portal>
                <Modal opened={opened} onClose={close} padding="xl">
                    <form onSubmit={form.onSubmit((values) => createTokens(values))}>
                        <Select
                            data={collectionNames.map(c => c.collection_name)}
                            label="Collection Name"
                            variant="filled"
                            withAsterisk
                            required={true}
                            value={selectedCollectionName}
                            onChange={setSelectedCollectionName}
                        />

                        <Divider
                            my="xs"
                            variant="dashed"
                            labelPosition="center"
                            label={<Box ml={5}>Royalty</Box>}
                        />
                        <TextInput
                            placeholder="Token Royalty Payee Address"
                            label="Token Royalty Payee Address"
                            withAsterisk
                            required={true}
                            {...form.getInputProps('tokenRoyaltyPayeeAddress')}
                        />
                        <Space h="xl"/>

                        <Text size="sm">Royalty Fee (% {(feeValue / 100).toFixed(2)})</Text>
                        <Slider min={0} max={1000} step={1} label={(value) => "%" + (value / 100).toFixed(2)}
                                value={feeValue} onChange={setFeeValue}
                                marks={[
                                    {value: 0, label: 'Generous'},
                                    {value: 200, label: 'Normal'},
                                    {value: 1000, label: 'Greedy'}
                                ]}/>
                        <Space h="xl"/>
                        <Group position="right" mt="md">
                            <Button ref={ref} disabled={!selectedCollectionName} variant="light" color="teal"
                                    type="submit">Create ({tokenDataList.length})</Button>
                        </Group>
                    </form>
                </Modal>
            </Portal>
        </>
    )
}