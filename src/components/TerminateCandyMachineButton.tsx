import {Button} from "@mantine/core";
import {IconSkull} from "@tabler/icons";
import React from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {EntryFunctionPayload} from "../services/CommonTypes";
import {CreateTerminateCandyMachineRequest} from "../services/aptos/client/AptosTypes";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export interface TerminateCandyMachineButtonProps {
    candyMachineAddress: string;
    onChangeCallback: Function;
}

export function TerminateCandyMachineButton({candyMachineAddress, onChangeCallback}: TerminateCandyMachineButtonProps) {
    const {client, candyMachineService} = useAptosClient();
    const {signAndSubmitTransaction} = useWallet();
    const ref = React.createRef<HTMLButtonElement>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!ref.current) return;
        if (!candyMachineAddress) return;

        const request: CreateTerminateCandyMachineRequest = {
            candyMachineAddress: candyMachineAddress
        };
        const payload: EntryFunctionPayload = candyMachineService.createTerminateCandyMachinePayload(request);

        const transactionHash = await signAndSubmitTransaction(payload);
        console.log(transactionHash);
        await client.waitForTransactionWithResult(transactionHash.hash);

        onChangeCallback();
    }

    return (
        <Button disabled={!candyMachineAddress} variant="light" color="red" fullWidth={true}
                onClick={handleSubmit} ref={ref} leftIcon={<IconSkull size={14}/>}>
            Terminate
        </Button>
    );
}