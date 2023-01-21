import {Button, Card, Center, Loader, Group, Text, CopyButton, Tooltip, ActionIcon, RingProgress, Badge} from "@mantine/core";
import {IconCheck, IconCopy} from "@tabler/icons";
import React from "react";
import addressOperation from "../utils/address";
import {useNavigate} from "react-router-dom";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {CandyMachineInfo, CandyMachineState} from "../services/aptos/client/AptosTypes";
import {CandyMachineStateIcon} from "./CandyMachineStateIcon";

interface CandyMachinePreviewProps {
    address: string;
}

export function CandyMachinePreview({address}: CandyMachinePreviewProps) {
    const maskedAddress = addressOperation.mask(address);

    const {candyMachineService} = useAptosClient();
    const navigate = useNavigate();
    const to = "/edit_candy_machine/" + address;

    const [isLoaded, setLoaded] = React.useState(false);
    const [candyMachineInfo, setCandyMachineInfo] = React.useState<CandyMachineInfo | null>(null);

    React.useEffect(() => {
        candyMachineService.getCandyMachineInfo(address)
            .then(info => {
                setCandyMachineInfo(info);
                setLoaded(true);
            });
    }, [address, candyMachineService, setCandyMachineInfo])

    if (!isLoaded || candyMachineInfo === null) {
        return (<Card shadow="sm" p="lg" radius="md" withBorder><Center style={{height: 200}}><Loader/></Center></Card>)
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Center>
                    <RingProgress
                        label={
                            <Center>
                                <CandyMachineStateIcon state={candyMachineInfo.state}/>
                            </Center>
                        }
                        sections={[
                            {value: candyMachineInfo.percentage_of_sold, color: 'green', tooltip: 'Sold candies'},
                        ]}
                    />
                </Center>
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <CopyButton value={address} timeout={2000}>
                    {({copied, copy}) => (
                        <Group position="left" mt="md" mb="xs">
                            <Text weight={50}>{maskedAddress}</Text>
                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                <ActionIcon aria-label={maskedAddress} color={copied ? 'teal' : 'gray'}
                                            onClick={copy}>
                                    {copied ? <IconCheck size={16}/> : <IconCopy size={16}/>}
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    )}
                </CopyButton>

                <Badge variant="light">
                    {CandyMachineState[candyMachineInfo.state]}
                </Badge>
            </Group>

            <Button onClick={() => navigate(to)} variant="light" fullWidth mt="md" radius="md">
                Settings
            </Button>
        </Card>
    );
}