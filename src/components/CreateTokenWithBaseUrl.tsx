import {
    Box,
    Button,
    Card,
    Center,
    Divider,
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
import {AptosCollection, AptosTokenData, CreateTokensOfOffChainRequest} from "../services/aptos/client/AptosTypes";
import axios from 'axios';
import {useDisclosure, useListState} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {OffChainTokenTable} from "./OffChainTokenTable";
import { EntryFunctionPayload } from "../services/CommonTypes";
import { OffChainTokenData } from "../types/SharedTypes";
import {IconArrowBigDownLines } from "@tabler/icons";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export interface CreateTokensWithBaseUrlProps {
    collectionNames: AptosCollection[];
    candyMachineAddress: string,
    onChangeCallback: Function,
}

export function CreateTokensWithBaseUrl({collectionNames, candyMachineAddress, onChangeCallback}: CreateTokensWithBaseUrlProps) {
    const {account, signAndSubmitTransaction} = useWallet();
    const {candyMachineService, client} = useAptosClient();
    const [tokenDataList, handlers] = useListState([] as AptosTokenData[]);
    const [opened, {close, open}] = useDisclosure(false);
    const [selectedCollectionName, setSelectedCollectionName] = useState<string | null>(null);
    const [feeValue, setFeeValue] = useState(200);
    const [startUrl, setStartUrl] = useState("");
    const [endUrl, setEndUrl] = useState("");
    const [offChainData, setOffChainData] = useState({startIndex: 0, endIndex: 0, baseUrl: "", baseUrlSuffix: ""});

    const form = useForm({
        initialValues: {
            tokenRoyaltyPayeeAddress: '',
        },
    });

    const resetRef = useRef<() => void>(null);

    const clearList = () => {
        resetRef.current?.();
        handlers.setState([] as AptosTokenData[]);
    };

    React.useEffect(() => {
        if (account?.address === null || account?.address === undefined) return;
        form.setFieldValue('tokenRoyaltyPayeeAddress', account.address.toString());
    }, [account]);

    const upload = () => {
        const startIndex = getIndex(startUrl);
        const endIndex = getIndex(endUrl);

        let lastPart = endUrl.split("/").pop();
        if (lastPart === undefined) return;

        const baseUrl = endUrl.replace(lastPart, "");
        let baseUrlSuffix = "";
        if (lastPart?.includes(".json")) {
            baseUrlSuffix = ".json";
        }
        setOffChainData({startIndex, endIndex, baseUrl, baseUrlSuffix});

        getTokenData(startUrl);
        getTokenData(endUrl);
    };

    const getIndex = (url: string) => {
        let lastPart = url.split("/").pop();
        if (lastPart?.includes(".json")) {
            lastPart = lastPart.replace(".json", "");
        }

        return Number(lastPart);
    }

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
        let request: CreateTokensOfOffChainRequest = {
            candyMachineAddress: candyMachineAddress,
            collectionName: selectedCollectionName,
            royaltyPayeeAddress: values.tokenRoyaltyPayeeAddress,
            royaltyPointsDenominator: denominator,
            royaltyPointsNumerator: numerator,
            tokenBaseName: selectedCollectionName + ' #',
            tokenBaseUri: offChainData.baseUrl,
            tokenBaseUriSuffix: offChainData.baseUrlSuffix,
            tokenBaseUriStartIndex: offChainData.startIndex,
            tokenBaseUriFinishIndex: offChainData.endIndex,
            tokenCommonDescription: tokenDataList[0].description,
        };

        console.log(request);
        const payload: EntryFunctionPayload = candyMachineService.createTokensOfOffChainPayload(request);

        try {
            const transactionHash = await signAndSubmitTransaction(payload);
            await client.waitForTransactionWithResult(transactionHash.hash);

            handlers.setState([] as AptosTokenData[]);
            onChangeCallback();
            close();
        } catch (error) {
            console.log(error)
            // see "Errors"
            // TODO: toast
        }
    };


    return (
        <>
            <Card shadow="sm" p="xl" withBorder>
                <TextInput label="Start Url"  value={startUrl}
                    onChange={(event) => {
                    setStartUrl(event.currentTarget.value);
                }} />
                <Space h="md"></Space>
                <TextInput label="End Url"  value={endUrl}
                    onChange={(event) => {
                    setEndUrl(event.currentTarget.value);
                }} />
                <Space h="md"></Space>
                <Button variant="light" disabled={!startUrl || !endUrl} onClick={upload} fullWidth>Upload Tokens</Button>
                <Space h="md"></Space>
                <Button fullWidth variant="light" disabled={tokenDataList.length<0} onClick={open} color="teal">Edit & Save</Button>
                <Space h="md"></Space>
                <Button fullWidth variant="light" disabled={tokenDataList.length<0} color="red" onClick={clearList}>Clear</Button>
                <Space h="md"></Space>
                <OffChainTokenTable header={true} paging={false} tokenDatas={tokenDataList.slice(0, 1)}/>
                { tokenDataList.length > 0 &&
                    <Center><IconArrowBigDownLines size={32} /></Center>
                }
                <OffChainTokenTable header={false} paging={false} tokenDatas={tokenDataList.slice(1, 2)}/>
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
                                type="submit">Create ({offChainData.endIndex-offChainData.startIndex+1})</Button>
                        </Group>
                    </form>
                </Modal>
            </Portal>
        </>
    )
}