import {Button} from "@mantine/core";
import {IconCirclePlus} from "@tabler/icons";
import React from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {randomId} from "@mantine/hooks";
import {CreateCandyMachineRequest} from "../services/aptos/client/AptosTypes";
import {EntryFunctionPayload} from "../services/CommonTypes";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export interface CreateCollectionButtonProps {
    onCreatedCallback: Function
}

export function CreateCandyMachineButton({onCreatedCallback}: CreateCollectionButtonProps) {
    const {client, candyMachineService} = useAptosClient();
    const {account, signAndSubmitTransaction} = useWallet();

    const ref = React.createRef<HTMLButtonElement>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!ref.current) return;
        if (account?.address === null || account?.address === undefined) return;

        const randomSeedValue = randomId();
        const request: CreateCandyMachineRequest = {
            seed: randomSeedValue
        };
        const payload: EntryFunctionPayload = candyMachineService.createCandyMachinePayload(request);

        try {
            const transactionHash = await signAndSubmitTransaction(payload);
            const txn: any = await client.waitForTransactionWithResult(transactionHash.hash);
            const change = txn.changes.find((c: any) => c.data?.type?.includes('candy_machine::CandyMachine<'))
            const candyMachineAddress = change.address;
            console.log(candyMachineAddress);
            onCreatedCallback();
        } catch (error) {
            // see "Errors"
            // TODO: toast
        }
    };

    return (
        <Button disabled={account?.address === null || account?.address === undefined} variant="light" color="teal" size="sm"
                onClick={handleSubmit} ref={ref} leftIcon={<IconCirclePlus size={18}/>}>
            Create Candy Machine
        </Button>
    );
}