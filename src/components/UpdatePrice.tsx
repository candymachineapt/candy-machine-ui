import { useWallet } from "@manahippo/aptos-wallet-adapter";
import {TextInput, Text, Group, Button} from "@mantine/core";
import React from "react";
import {useState} from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {UpdateSellPriceRequest} from "../services/aptos/client/AptosTypes";
import {EntryFunctionPayload} from "../services/CommonTypes";

export interface UpdatePriceProps {
    sellPrice: string;
    candyMachineAddress: string;
    changable: boolean;
    onChangeCallback: Function;
}

export function UpdatePrice({sellPrice, candyMachineAddress, changable, onChangeCallback}: UpdatePriceProps) {
    const [newPrice, setNewPrice] = useState(sellPrice);
    const [disabled, setDisable] = useState(changable);
    const [hasError, setError] = useState(false);

    React.useEffect(() => {
        if (/\d+(\.\d+)?$/.test(newPrice)) {
            setError(false);
            setDisable(newPrice === sellPrice);
        } else {
            setDisable(true);
            setError(true);
        }
    }, [newPrice, setDisable, setError, sellPrice]);

    const ref = React.createRef<HTMLButtonElement>();
    const {client, candyMachineService} = useAptosClient();
    const {signAndSubmitTransaction} = useWallet();

    const updatePrice = async (e: any) => {
        if (!ref.current) return;
        if (!candyMachineAddress) return;

        const request: UpdateSellPriceRequest = {
            candyMachineAddress: candyMachineAddress,
            newPrice: Number(newPrice) * Number(100000000),
        };

        const payload: EntryFunctionPayload = candyMachineService.createUpdateSellPricePayload(request);

        try {
            const transactionHash = await signAndSubmitTransaction(payload);
            await client.waitForTransactionWithResult(transactionHash.hash);

            setDisable(true);
            onChangeCallback();
        } catch (error) {
            setDisable(false);
            // see "Errors"
            // TODO: toast
        }
    };

    return (
        <Group position="center">
            <TextInput
                disabled={!changable}
                error={hasError}
                value={newPrice}
                onChange={(event) => {
                    setNewPrice(event.currentTarget.value);
                }}
                rightSection={<Text size='xs'>APT</Text>}
            />
            <Button variant="light" ref={ref} disabled={disabled || !changable}
                    onClick={updatePrice}>Update</Button>
        </Group>
    );
}