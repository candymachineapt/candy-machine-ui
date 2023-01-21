import {Text} from "@mantine/core";
import React from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";

export interface BalanceOfCandyMachineProps {
    candyMachineAddress: string
}

export function BalanceOfCandyMachine({candyMachineAddress}: BalanceOfCandyMachineProps) {
    const {candyMachineService} = useAptosClient();

    const [totalAmount, setTotalAmount] = React.useState<number>(0);
    React.useEffect(() => {
        candyMachineService.getBalance(candyMachineAddress).then((balance) => {
            setTotalAmount(balance);
        });
    }, [candyMachineService, setTotalAmount, candyMachineAddress]);

    return (
        <Text>Balance: {totalAmount.toFixed(8)} APT</Text>
    )
}