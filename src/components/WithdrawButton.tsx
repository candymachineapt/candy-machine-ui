import {Button} from "@mantine/core";
import React from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {CreateWithdrawRequest} from "../services/aptos/client/AptosTypes";
import {EntryFunctionPayload} from "../services/CommonTypes";
import {IconBrandCashapp} from "@tabler/icons";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export interface WithdrawButtonProps {
    candyMachineAddress: string;
    onChangeCallback: Function;
}

export function WithdrawButton({candyMachineAddress, onChangeCallback}: WithdrawButtonProps) {
    const {client, candyMachineService} = useAptosClient();
    const {signAndSubmitTransaction} = useWallet();
    const ref = React.createRef<HTMLButtonElement>();


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!ref.current) return;
        if (!candyMachineAddress) return;

        const request: CreateWithdrawRequest = {
            candyMachineAddress: candyMachineAddress
        };
        const payload: EntryFunctionPayload = candyMachineService.createWithdrawPayload(request);
        const transactionHash = await signAndSubmitTransaction(payload);
        console.log(transactionHash);
        await client.waitForTransactionWithResult(transactionHash.hash);

        onChangeCallback();
    }

    return (
        <Button disabled={!candyMachineAddress} variant="light" color="teal" fullWidth={true}
                onClick={handleSubmit} ref={ref} leftIcon={<IconBrandCashapp size={22}/>}>
            Withdraw
        </Button>
    );
}