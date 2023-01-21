import {Grid, Text, Space, Title, Loader, Center, Divider, Group} from "@mantine/core";
import React, {ReactElement, useCallback} from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {CandyMachinePreview} from "./CandyMachinePreview";
import {CreateCandyMachineButton} from "./CreateCandyMachineButton";
import {Async} from "react-async";
import {useDisclosure} from "@mantine/hooks";
import {IconInfoCircle} from "@tabler/icons";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

const CandyMachines = () => {
    const {account} = useWallet();
    const {candyMachineService} = useAptosClient();

    const [trigger, handlers] = useDisclosure(false);
    const onCreatedPromise = useCallback(async () => {
        if (account?.address === null || account?.address === undefined) {
            throw new Error("Please connect your wallet");
        }

        const candies = await candyMachineService.getCandyMachineAddresses(account.address.toString());
        const results = candies.reverse().map((c: string) =>
            <Grid.Col key={c} span={3}><CandyMachinePreview address={c}/></Grid.Col>
        );

        if (results.length === 0) {
            return (
                <Grid justify="center" align="center" mt="lg">
                    <Grid.Col>
                        <Center><IconInfoCircle size={36} /></Center>
                        <Center><Title order={5}>Let's create a candy machine</Title></Center>
                    </Grid.Col>
                </Grid>
            );
        }

        return (<Grid>{results}</Grid>);
    }, [candyMachineService, account, trigger]);

    const onCreatedCallback = useCallback(() => {
        handlers.toggle();
    }, [handlers]);

    return (
        <>
            <Group position="apart">
                <Title order={2}>My Candy Machines</Title>
                <CreateCandyMachineButton onCreatedCallback={onCreatedCallback}/>
            </Group>
            <Divider my="sm"/>
            <Space h="md"/>
            <Async promiseFn={onCreatedPromise}>
                <Async.Pending><Center style={{height: 200}}><Loader/></Center></Async.Pending>
                <Async.Fulfilled>{(result: ReactElement) => (result)}</Async.Fulfilled>
                <Async.Rejected>{error => <Text>Something went wrong: {error.message}</Text>}</Async.Rejected>
            </Async>
        </>
    );
}

export default CandyMachines;