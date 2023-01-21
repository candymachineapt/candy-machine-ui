import {Button} from "@mantine/core";
import {IconRun} from "@tabler/icons";
import React from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {EntryFunctionPayload} from "../services/CommonTypes";
import {CreateStartCandyMachineRequest} from "../services/aptos/client/AptosTypes";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export interface StartCandyMachineButtonProps {
    candyMachineAddress: string;
    onChangeCallback: Function;
}

export function StartCandyMachineButton({candyMachineAddress, onChangeCallback}: StartCandyMachineButtonProps) {
    const {client, candyMachineService} = useAptosClient();
    const {signAndSubmitTransaction} = useWallet();
    const ref = React.createRef<HTMLButtonElement>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!ref.current) return;
        if (!candyMachineAddress) return;

        const request: CreateStartCandyMachineRequest = {
            candyMachineAddress: candyMachineAddress
        };
        const payload: EntryFunctionPayload = candyMachineService.createStartCandyMachinePayload(request);

        const transactionHash = await signAndSubmitTransaction(payload);
        console.log(transactionHash);
        await client.waitForTransactionWithResult(transactionHash.hash);

        onChangeCallback();
    }

    return (
        <Button disabled={!candyMachineAddress} variant="light" fullWidth={true}
                onClick={handleSubmit} ref={ref} leftIcon={<IconRun size={14}/>}>
            Start
        </Button>
    );
}