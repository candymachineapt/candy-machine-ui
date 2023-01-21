import {createStyles, Image} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
    root: {
        filter: theme.colorScheme === 'dark' ? 'invert(98%) sepia(6%) saturate(2%) hue-rotate(358deg) brightness(112%) contrast(100%)'
        : '',
    },
}));

export default function LifeCycleOfStates() {
    const { classes } = useStyles();

    return (
        <div>
            <Image
                radius="md"
                src="/life-cycle-of-states.svg"
                caption="Life cycle of candy machine states"
                className={classes.root}
            />
        </div>
    )
}