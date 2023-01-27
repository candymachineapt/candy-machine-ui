import {Button, Container, TextInput, Title, Notification, Space } from "@mantine/core";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {CandyMachineState, CreateMintRequest} from "../services/aptos/client/AptosTypes";
import { useDebouncedValue } from "@mantine/hooks";
import { EntryFunctionPayload } from "../services/CommonTypes";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { IconX } from "@tabler/icons";

export default function MintPage() {
    const {signAndSubmitTransaction, connect} = useWallet();
    const {client, candyMachineService} = useAptosClient();
    const {candyMachineAddress} = useParams();
    const [address, setAddress] = useState(candyMachineAddress)
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

    useEffect(() => {
        if (!debounced) {
            setError("Candy machine address is needed");
            return;
        }

        candyMachineService.getCandyMachineInfo(debounced).then((info) => {
            if (!info) {
                setError("Invalid candy machine address");
                return;
            }

            if (info.state !== CandyMachineState.Active) {
                setError("Candy machine is not active");
                return;
            }

            setError(null);
        });
    }, [candyMachineService, debounced, setError]);

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
                    <Button fullWidth type="submit" mt="md">Mint</Button>
                }
            </form>
        </Container>
    )
}