import { useWallet } from "@manahippo/aptos-wallet-adapter";
import {
    ActionIcon,
    Button,
    Group,
    Modal,
    NumberInput,
    Portal,
    Space,
    TextInput,
    Text,
    Slider,
    Select,
    Divider, Box
} from "@mantine/core"
import {useForm} from "@mantine/form";
import {randomId, useDisclosure} from "@mantine/hooks";
import {IconTrash} from "@tabler/icons";
import React, {useState} from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {AptosCollection, CreateTokenRequest, TokenProperty} from "../services/aptos/client/AptosTypes";
import {EntryFunctionPayload} from "../services/CommonTypes";

export interface CreateTokenButtonProps {
    candyMachineAddress: string,
    collectionNames: AptosCollection[];
    onChangeCallback: Function;
}

interface PropertyProps {
    key: string;
    name: string;
    value: string;
}

export function CreateTokenButton({candyMachineAddress, collectionNames, onChangeCallback}: CreateTokenButtonProps) {
    const {account, signAndSubmitTransaction} = useWallet();
    const {candyMachineService, client} = useAptosClient();
    const [opened, {close, open}] = useDisclosure(false);
    const ref = React.createRef<HTMLButtonElement>();
    const [feeValue, setFeeValue] = useState(200);
    const [selectedCollectionName, setSelectedCollectionName] = useState<string | null>(null);

    const form = useForm({
        initialValues: {
            tokenName: '',
            tokenDescription: '',
            tokenMaximum: 1,
            tokenUri: '',
            tokenRoyaltyPayeeAddress: '',
            properties: [] as PropertyProps[],
        },
        validate: {
            tokenUri: (value) => (/^(ftp|http|https|ipfs):\/\/[^ "]+$/.test(value) ? null : 'Invalid url'),
            tokenMaximum: (value) => (value < 1 ? 'Size must be at least 1' : null),
        },
    });

    React.useEffect(() => {
        if (account?.address === null || account?.address === undefined) return;
        form.setFieldValue('tokenRoyaltyPayeeAddress', account.address.toString());
    }, [account]);

    const createToken = async (values: any) => {
        if (!ref.current) return;
        if (account?.address === null || account?.address === undefined) return;
        if (!selectedCollectionName) return;

        const numerator = feeValue;
        const denominator = 10000;

        const propertiezz: TokenProperty[] = values.properties.map((item: any, index: any) => ({
                key: item.name,
                value: item.value
            } as TokenProperty
        ));

        const request: CreateTokenRequest = {
            candyMachineAddress: candyMachineAddress,
            collectionName: selectedCollectionName,
            name: values.tokenName,
            description: values.tokenDescription,
            maximum: values.tokenMaximum,
            royaltyPayeeAddress: values.tokenRoyaltyPayeeAddress,
            royaltyPointsDenominator: denominator,
            royaltyPointsNumerator: numerator,
            uri: values.tokenUri,
            properties: propertiezz
        };

        console.log(request);
        const payload: EntryFunctionPayload = candyMachineService.createTokenPayload(request);

        try {
            const transactionHash = await signAndSubmitTransaction(payload);
            await client.waitForTransactionWithResult(transactionHash.hash);

            close();
            onChangeCallback();
        } catch (error) {
            // see "Errors"
            // TODO: toast
        }
    };

    const properties = form.values.properties.map((item, index) => (
        <Group key={item.key} mt="xs">
            <TextInput
                placeholder="Property Name"
                withAsterisk
                sx={{flex: 1}}
                {...form.getInputProps(`properties.${index}.name`)}
            />
            <TextInput
                placeholder="Property Value"
                withAsterisk
                sx={{flex: 1}}
                {...form.getInputProps(`properties.${index}.value`)}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('properties', index)}>
                <IconTrash size={16}/>
            </ActionIcon>
        </Group>
    ));

    return (
        <>
            <Button ref={ref} onClick={open} variant="light" color="teal" fullWidth mt="md" radius="md">
                Create Token
            </Button>
            <Portal>
                <Modal opened={opened} onClose={close} padding="xl">
                    <form onSubmit={form.onSubmit((values) => createToken(values))}>
                        <Select
                            data={collectionNames.map(c => c.collection_name)}
                            label="Collection Name"
                            variant="filled"
                            withAsterisk
                            required={true}
                            value={selectedCollectionName}
                            onChange={setSelectedCollectionName}
                        />
                        <Space h="xs"/>
                        <TextInput
                            placeholder="Token Name"
                            label="Token Name"
                            withAsterisk
                            required={true}
                            variant="filled"
                            {...form.getInputProps('tokenName')}
                        />
                        <Space h="xs"/>
                        <TextInput
                            placeholder="Token Description"
                            label="Token Description"
                            description="A brief summary of the token"
                            variant="filled"
                            {...form.getInputProps('tokenDescription')}
                        />
                        <Space h="xs"/>
                        <NumberInput
                            placeholder="Token Maximum"
                            label="Token Maximum"
                            description="This input determines how many nft, users can mint in this token data. Enter 1 to be unique."
                            variant="filled"
                            withAsterisk
                            hideControls
                            required={true}
                            {...form.getInputProps('tokenMaximum')}
                            value={1}
                        />
                        <Space h="md"/>
                        <TextInput
                            placeholder="Token Uri"
                            label="Token Uri"
                            description="It's a uri of any media type which is image, video etc."
                            variant="filled"
                            withAsterisk
                            required={true}
                            {...form.getInputProps('tokenUri')}
                        />
                        <Space h="xs"/>
                        <Space h="xl"/>

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

                        <Divider
                            my="xs"
                            variant="dashed"
                            labelPosition="center"
                            label={<Box ml={5}>On-chain (aptos) properties [optional]</Box>}
                        />
                        {properties.length > 0 ? (
                            <Group mb="xs">
                                <Text weight={500} size="sm" sx={{flex: 1}}>
                                    Propety Name
                                </Text>
                                <Text weight={500} size="sm" pr={90}>
                                    Property Value
                                </Text>
                            </Group>
                        ) : (
                            <Text color="dimmed" align="center">
                                Token has no property
                            </Text>
                        )}

                        {properties}
                        <Group position="center" mt="md">
                            <Button variant="light"
                                onClick={() =>
                                    form.insertListItem('properties', {name: '', value: '', key: randomId()})
                                }
                            >
                                Add property
                            </Button>
                        </Group>
                        <Space h="xs"/>
                        <Group position="right" mt="md">
                            <Button variant="light" color="teal" type="submit">Create</Button>
                        </Group>
                    </form>
                </Modal>
            </Portal>
        </>
    )
}