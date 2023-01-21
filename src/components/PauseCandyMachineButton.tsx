import {Button} from "@mantine/core";
import {IconHandStop} from "@tabler/icons";
import React from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {EntryFunctionPayload} from "../services/CommonTypes";
import {CreatePauseCandyMachineRequest} from "../services/aptos/client/AptosTypes";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export interface PauseCandyMachineButtonProps {
    candyMachineAddress: string;
    onChangeCallback: Function;
}

export function PauseCandyMachineButton({candyMachineAddress, onChangeCallback}: PauseCandyMachineButtonProps) {
    const {client, candyMachineService} = useAptosClient();
    const {signAndSubmitTransaction} = useWallet();
    const ref = React.createRef<HTMLButtonElement>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!ref.current) return;
        if (!candyMachineAddress) return;

        const request: CreatePauseCandyMachineRequest = {
            candyMachineAddress: candyMachineAddress
        };
        const payload: EntryFunctionPayload = candyMachineService.createPauseCandyMachinePayload(request);

        const transactionHash = await signAndSubmitTransaction(payload);
        console.log(transactionHash);
        await client.waitForTransactionWithResult(transactionHash.hash);

        onChangeCallback();
    }

    return (
        <Button disabled={!candyMachineAddress} variant="light" fullWidth={true}
                onClick={handleSubmit} ref={ref} leftIcon={<IconHandStop size={14}/>}>
            Pause
        </Button>
    );
}