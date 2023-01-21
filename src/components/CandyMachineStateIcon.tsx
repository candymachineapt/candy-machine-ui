import { ThemeIcon } from "@mantine/core";
import { IconMoonStars, IconQuestionMark, IconSeeding, IconRun, IconCheck } from "@tabler/icons";
import { ReactElement } from "react";
import { CandyMachineState } from "../services/aptos/client/AptosTypes";

interface CandyMachineStateIconProps {
    state: CandyMachineState;
}

const registry = new Map<CandyMachineState, ReactElement>();
registry.set(CandyMachineState.Unknown, (<IconQuestionMark size={22}/>));
registry.set(CandyMachineState.Initial, (<IconSeeding size={32}/>));
registry.set(CandyMachineState.Active, (<IconRun size={22}/>));
registry.set(CandyMachineState.Idle, (<IconMoonStars size={22}/>));
registry.set(CandyMachineState.Final, (<IconCheck size={22}/>));

export function CandyMachineStateIcon({state}: CandyMachineStateIconProps) {
    const summary = registry.get(state);

    return (
        <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
            {summary}
        </ThemeIcon>
    );
}