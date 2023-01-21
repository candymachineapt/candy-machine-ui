import {Center, createStyles, Grid, Group,
    Indicator, Loader, Paper, Text} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import React, {ReactElement, useCallback} from "react";
import {Async} from "react-async";
import useAptosClient from '../hooks/aptosClient/useAptosClient';
import {CandyMachineEvent} from "../services/aptos/client/AptosTypes";

const useStyles = createStyles((theme) => ({
    value: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1,
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

const titleRegistry = new Map<string, string>();
titleRegistry.set("create_candy_machine_events", "Candy Machines");
titleRegistry.set("mint_events", "Mints");

const descriptionRegistry = new Map<string, string>();
descriptionRegistry.set("create_candy_machine_events", "Number of machines in the entire network");
descriptionRegistry.set("mint_events", "Number of mints in the entire network");

export function StatsGroup() {
    const {network} = useAptosClient();
    const {candyMachineService} = useAptosClient();
    const {classes} = useStyles();

    const [trigger, handlers] = useDisclosure(false);
    const fetchStatsPromise = useCallback(async () => {
        const events = await candyMachineService.getCandyMachineEvents();
        const results = events.map((event: CandyMachineEvent) => (
            <Grid.Col span={6}>
                <Indicator label={network ? network?.name : "Testnet"} radius="sm" position="top-center" color="cyan" size={16}>
                    <Paper withBorder p="md" radius="md" key={event.type}>
                        <Group position="apart">
                            <Text size="xs" color="dimmed" className={classes.title}>
                                {titleRegistry.get(event.type)}
                            </Text>
                        </Group>
                        <Group align="flex-end" spacing="xs" mt={25}>
                            <Text className={classes.value}>{event.counter}</Text>
                        </Group>
                        <Text size="xs" color="dimmed" mt={7}>
                            {descriptionRegistry.get(event.type)}
                        </Text>
                    </Paper>
                </Indicator>
            </Grid.Col>
        ));

        return results;
    }, [candyMachineService, trigger]);

    return (
        <Async promiseFn={fetchStatsPromise}>
            <Async.Pending><Center style={{height: 200}}><Loader/></Center></Async.Pending>
            <Async.Fulfilled>{(results: ReactElement) => (<>{results}</>)}</Async.Fulfilled>
            <Async.Rejected>{error => <Text>Something went wrong: {error.message}</Text>}</Async.Rejected>
        </Async>
    )
}