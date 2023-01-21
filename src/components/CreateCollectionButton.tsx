import { useWallet } from "@manahippo/aptos-wallet-adapter";
import {Button, Group, Modal, NumberInput, Portal, Space, TextInput} from "@mantine/core";
import {useForm} from '@mantine/form';
import {useDisclosure} from '@mantine/hooks';
import React from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import { CreateCollectionRequest } from "../services/aptos/client/AptosTypes";
import { EntryFunctionPayload } from "../services/CommonTypes";

export interface CreateCollectionButtonProps {
    candyMachineAddress: string,
    onCreatedCallback: Function
}

export function CreateCollectionButton({candyMachineAddress, onCreatedCallback}: CreateCollectionButtonProps) {
    const {account, signAndSubmitTransaction} = useWallet();
    const {client, candyMachineService} = useAptosClient();
    const [opened, {close, open}] = useDisclosure(false);
    const ref = React.createRef<HTMLButtonElement>();

    const form = useForm({
        initialValues: {collectionName: '', collectionDesc: '', collectionUrl: '', collectionSize: -1},
        validate: {
            collectionName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            collectionUrl: (value) => (/^(ftp|http|https):\/\/[^ "]+$/.test(value) ? null : 'Invalid url'),
            collectionSize: (value) => (value < 0 ? 'Size must be at least 0' : null),
        },
    });

    const addCollection = async (values: any) => {
        if (!ref.current) return;
        if (account?.address === null || account?.address === undefined) return;

        const request: CreateCollectionRequest = {
            candyMachineAddress: candyMachineAddress,
            name: values.collectionName,
            description: values.collectionDesc,
            url: values.collectionUrl,
            size: values.collectionSize
        };
        const payload: EntryFunctionPayload = candyMachineService.createCollectionPayload(request);

        try {
            const transactionHash = await signAndSubmitTransaction(payload);
            await client.waitForTransactionWithResult(transactionHash.hash);

            onCreatedCallback();

            form.setValues({
                collectionName: '', collectionDesc: '', collectionUrl: '', collectionSize: -1
            });
            close();
        } catch (error) {
            // see "Errors"
            // TODO: toast
        }
    };

    return (
        <>
            <Button ref={ref} onClick={open} variant="light" color="teal" radius="md">
                Create Collection
            </Button>
            <Portal>
                <Modal opened={opened} onClose={close}>
                    <form onSubmit={form.onSubmit((values) => addCollection(values))}>
                        <TextInput
                            placeholder="Collection Name"
                            label="Collection Name"
                            variant="filled"
                            withAsterisk
                            required={true}
                            {...form.getInputProps('collectionName')}
                        />
                        <Space h="xs"/>
                        <TextInput
                            placeholder="Collection Description"
                            label="Collection Description"
                            description="A brief summary of the collection"
                            variant="filled"
                            {...form.getInputProps('collectionDesc')}
                        />
                        <Space h="xs"/>
                        <TextInput
                            placeholder="Collection Url"
                            label="Collection Url"
                            description="Collection's official web site"
                            variant="filled"
                            withAsterisk
                            required={true}
                            {...form.getInputProps('collectionUrl')}
                        />
                        <Space h="xs"/>
                        <NumberInput
                            placeholder="Collection Size"
                            label="Collection Size"
                            description="This input determines how many tokens you can create in this collection. If value equals 0, collection size is unlimited."
                            variant="filled"
                            withAsterisk
                            hideControls
                            required={true}
                            {...form.getInputProps('collectionSize')}
                        />
                        <Space h="md"/>
                        <Group position="right" mt="md">
                            <Button color="teal" variant="light" type="submit">Create</Button>
                        </Group>
                    </form>
                </Modal>
            </Portal>
        </>
    );
}