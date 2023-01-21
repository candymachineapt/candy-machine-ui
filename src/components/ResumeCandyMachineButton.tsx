import {Button} from "@mantine/core";
import {IconRun} from "@tabler/icons";
import React from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {EntryFunctionPayload} from "../services/CommonTypes";
import { CreateResumeCandyMachineRequest } from "../services/aptos/client/AptosTypes";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export interface ResumeCandyMachineButtonProps {
    candyMachineAddress: string
    onChangeCallback: Function;
}

export function ResumeCandyMachineButton({candyMachineAddress, onChangeCallback}: ResumeCandyMachineButtonProps) {
    const {client, candyMachineService} = useAptosClient();
    const {signAndSubmitTransaction} = useWallet();
    const ref = React.createRef<HTMLButtonElement>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!ref.current) return;
        if (!candyMachineAddress) return;

        const request: CreateResumeCandyMachineRequest = {
            candyMachineAddress: candyMachineAddress
        };
        const payload: EntryFunctionPayload = candyMachineService.createResumeCandyMachinePayload(request);

        const transactionHash = await signAndSubmitTransaction(payload);
        console.log(transactionHash);
        await client.waitForTransactionWithResult(transactionHash.hash);

        onChangeCallback();
    }

    return (
        <Button disabled={!candyMachineAddress} variant="light" fullWidth={true}
                onClick={handleSubmit} ref={ref} leftIcon={<IconRun size={14}/>}>
            Resume
        </Button>
    );
}