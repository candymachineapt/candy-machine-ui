import {ActionIcon, Group, Text} from "@mantine/core";
import {CandyMachineState} from "../services/aptos/client/AptosTypes";
import {TerminateCandyMachineButton} from "./TerminateCandyMachineButton";
import {PauseCandyMachineButton} from "./PauseCandyMachineButton";
import {ResumeCandyMachineButton} from "./ResumeCandyMachineButton";
import {StartCandyMachineButton} from "./StartCandyMachineButton";
import {IconFlag} from "@tabler/icons";


export interface CandyMachineStateGroupProps {
    candyMachineAddress: string,
    candyMachineState: CandyMachineState,
    onChangeCallback: Function;
}

export function CandyMachineStateGroup({candyMachineAddress, candyMachineState, onChangeCallback}: CandyMachineStateGroupProps) {
    const showStartButton = candyMachineState === CandyMachineState.Initial;
    const showPauseButton = candyMachineState === CandyMachineState.Active;
    const showResumeButton = candyMachineState === CandyMachineState.Idle;
    const showTerminateButton = ![CandyMachineState.Final, CandyMachineState.Initial].includes(candyMachineState);
    const showDoneMessage = candyMachineState === CandyMachineState.Final;

    return (
        <Group position="center" mt="md" mb="xs">
            {showStartButton &&
                <StartCandyMachineButton candyMachineAddress={candyMachineAddress} onChangeCallback={onChangeCallback}/>
            }
            {showPauseButton &&
                <PauseCandyMachineButton candyMachineAddress={candyMachineAddress} onChangeCallback={onChangeCallback}/>
            }
            {showResumeButton &&
                <ResumeCandyMachineButton candyMachineAddress={candyMachineAddress} onChangeCallback={onChangeCallback}/>
            }
            {showTerminateButton &&
                <TerminateCandyMachineButton candyMachineAddress={candyMachineAddress} onChangeCallback={onChangeCallback}/>
            }

            {showDoneMessage &&
                <Group position="center">
                    <ActionIcon disabled variant="transparent">
                        <IconFlag size={24}/>
                    </ActionIcon>
                    <Text color="dimmed">Ended</Text>
                </Group>
            }
        </Group>
    )
}