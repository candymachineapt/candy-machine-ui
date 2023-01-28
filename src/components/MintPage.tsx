import {Button, Container, Notification, Space, Text, TextInput, Title} from "@mantine/core";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {CandyMachineState, CreateMintRequest} from "../services/aptos/client/AptosTypes";
import {useDebouncedValue, useDidUpdate} from "@mantine/hooks";
import {EntryFunctionPayload} from "../services/CommonTypes";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {IconX, IconConfetti} from "@tabler/icons";

export default function MintPage() {
    const {signAndSubmitTransaction, connect} = useWallet();
    const {client, candyMachineService} = useAptosClient();
    const {candyMachineAddress} = useParams();
    const [address, setAddress] = useState(candyMachineAddress)
    const [fixedSellPrice, setFixedSellPrice] = useState<string | null>(null)
    const [totalCandies, setTotalCandies] = useState<number | null>(null)
    const [soldCandies, setSoldCandies] = useState<number | null>(null)
    const [isSoldOut, setIsSoldOut] = useState<boolean>(false)
    const [debounced] = useDebouncedValue(address, 200);

    const [error, setError] = useState<string | null>();

    const handleChange = (e:any) => setAddress(e.target.value);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!debounced) {
            setError("Candy machine address is needed");
            return;
        }

        const request: CreateMintRequest = {
            candyMachineAddress: debounced
        };
        const payload: EntryFunctionPayload = candyMachineService.createStarMintPayload(request);

        await connect();

        const transactionHash = await signAndSubmitTransaction(payload);
        console.log(transactionHash);
        await client.waitForTransactionWithResult(transactionHash.hash);
    }

    useDidUpdate(() => {
        setFixedSellPrice(null);
        setTotalCandies(null);
        setSoldCandies(null);
        setIsSoldOut(false);

        if (!debounced) {
            setError("Candy machine address is needed");
            return;
        }

        candyMachineService.getCandyMachineInfo(debounced).then((info) => {
            if (!info) {
                setError("Invalid candy machine address");
                return;
            }

            if (info.state === CandyMachineState.Final) {
                setError(null);
                setIsSoldOut(true);
                return;
            }

            if (info.state !== CandyMachineState.Active) {
                setError("Candy machine is not active");
                return;
            }

            setFixedSellPrice(info.fixed_sell_price.toFixed(2));
            setSoldCandies(info.sold_candies);
            setTotalCandies(info.candies.length);

            setError(null);
        });
    }, [candyMachineService, debounced, setError, setIsSoldOut, setFixedSellPrice, setSoldCandies, setTotalCandies]);

    return (
        <Container size="sm">
            <Title align="center">
                Mint Page
            </Title>
            <TextInput
                disabled={candyMachineAddress!==undefined}
                name="candyMachineAddress"
                label="Candy machine address"
                mt="md"
                value={address}
                onChange={handleChange}
                withAsterisk/>
            <Space h="md"/>
            <form onSubmit={handleSubmit}>
                { error &&
                    <Notification icon={<IconX size={18} />} color="red" disallowClose>
                        {error}
                    </Notification>
                }
                { !error &&
                    <>
                    { !isSoldOut &&
                        <>
                            <Text>Minted: {soldCandies} / {totalCandies}</Text>
                            <Text>Mint Price: {fixedSellPrice} APT</Text>
                            <Button fullWidth type="submit" mt="md">Mint</Button>
                        </>
                    }

                    { isSoldOut &&
                        <>
                            <Notification icon={<IconConfetti size={18} />} title="Sold Out!" color="green" disallowClose></Notification>
                        </>
                    }
                    </>
                }
            </form>
        </Container>
    )
}