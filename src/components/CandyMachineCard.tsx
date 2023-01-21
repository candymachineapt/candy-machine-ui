import {ActionIcon, Badge, Box, Card, Center, CopyButton, Divider, Group, RingProgress, Tooltip, Text, Space} from "@mantine/core";
import {CandyMachineStateIcon} from "./CandyMachineStateIcon";
import {UpdatePrice} from "./UpdatePrice";
import {MintButton} from "./MintButton";
import {CandyMachineStateGroup} from "./CandyMachineStateGroup";
import {CandyMachineInfo, CandyMachineState} from "../services/aptos/client/AptosTypes";
import {IconCheck, IconCopy} from "@tabler/icons";
import {WithdrawButton} from "./WithdrawButton";
import {BalanceOfCandyMachine} from "./BalanceOfCandyMachine";
import addressOperation from "../utils/address";
import {ShareMintPage} from "./ShareMintPage";

interface CandyMachineCardProps {
    candyMachineInfo: CandyMachineInfo;
    onChangeCallback: Function;
}

export function CandyMachineCard({candyMachineInfo, onChangeCallback}: CandyMachineCardProps) {
    console.log(candyMachineInfo);
    const maskedAddress = addressOperation.mask(candyMachineInfo.address);
    const sellPriceText = candyMachineInfo.fixed_sell_price.toFixed(8);
    const priceChangable = candyMachineInfo.state === CandyMachineState.Initial;
    const mintable = candyMachineInfo.state === CandyMachineState.Active;

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
                <CopyButton value={candyMachineInfo.address} timeout={2000}>
                    {({copied, copy}) => (
                            <Group position="left" mt="md" mb="xs">
                                <Text weight={50}>{maskedAddress}</Text>
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                    <ActionIcon aria-label={maskedAddress} color={copied ? 'teal' : 'gray'} onClick={copy}>
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

            <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={<Box ml={5}>Price</Box>}
            />
            <UpdatePrice sellPrice={sellPriceText} candyMachineAddress={candyMachineInfo.address}
                changable={priceChangable} onChangeCallback={onChangeCallback}/>

            {mintable &&
            <>
            <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={<Box ml={5}>Mint</Box>}
            />
            <MintButton candyMachineAddress={candyMachineInfo.address} onChangeCallback={onChangeCallback}/>
            <Space h="md"/>
            <ShareMintPage candyMachineAddress={candyMachineInfo.address} />
            </>
            }
            <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={<BalanceOfCandyMachine candyMachineAddress={candyMachineInfo.address}/>}
            />
            <WithdrawButton candyMachineAddress={candyMachineInfo.address} onChangeCallback={onChangeCallback}/>
            <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={<Text>State</Text>}
            />
            <CandyMachineStateGroup candyMachineAddress={candyMachineInfo.address} candyMachineState={candyMachineInfo.state}
                onChangeCallback={onChangeCallback}/>
        </Card>
    )
}