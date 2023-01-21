import {Title, createStyles, Accordion, Container} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        minHeight: 650,
    },

    title: {
        marginBottom: theme.spacing.xl * 1.5,
    },

    item: {
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,

        border: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },
}));

const registry = new Map<string, string>();
registry.set("Which network should I choose", "We recommend that do not test on the mainnet to avoid financial loss. After all tests you can use the mainnet chain.");
registry.set("Why can't I connect with my petra wallet?", "Petra makes mistakes in gas calculations of large transactions. For this reason, we have decided not to activate until it is fixed.");
registry.set("When will it come to mainnet?", "This will be determined according to the feedback and reviews we receive in the testnet.");
registry.set("How to create candy machine?", "First of all, you need to connect to the website with your wallet. After that go to the 'My Candy Machines' page and click the 'Create Candy Machine' button at the top. At this stage, you need to approve the transaction from your wallet. The machine with initial state, you just approved will appear on the page.");
registry.set("How to create collection?", "Go to the settings page of the machine you created earlier. Only you can see this page. You can create more than one collection in the candy machine, but you can proceed with a single collection for the first try. Click the 'Create Collection' button under the collections area. Fill in the fields on the displayed page according to the directions on the screen and press the 'Create' button for the last time. If you approve from your wallet, there will be a collection in the machine.");
registry.set("How to create an nft of a collection?", "In the tokens table at the bottom of the settings page, it shows the candies (for now we just put nft) inside the candy machine. Let's put an nft in this empty table. Press the 'Create Token' button. Fill in the fields on the displayed page according to the directions on the screen and press the 'Create' button for the last time. After wallet approval, a new record will appear in the table. You can repeat this step a few times and expand the collection. All other information except nft's visual address is kept on aptos chain. The image address must be immutable and kept in permanent storage chains like ipfs, arweave etc.");
registry.set("How to set nft mint fee?", "When the machine is in the initial state, you can change the price section on the settings page. Note that it cannot be changed after starting the machine.");
registry.set("How to start minting?", "When the machine is in the initial state, you can start on the settings page. As soon as you press the start button, the machine will start to work and anyone can use it now, so press it at the promised time.");
registry.set("How to pause minting?", "When the machine is in the active state, you can pause on the settings page. If you want to pause the use of the machine, you can do so. You can then resume with the same method.");
registry.set("How to terminate minting?", "When the machine is in the any state, you can terminate on the settings page. In the case of termination with the button, the machine is now completely closed without returning, you can only withdraw the minting fees to your account. Automatically terminates when there is no nft left in the candy machine.");


export default function FAQ() {
    const { classes } = useStyles();
    const results = [] as JSX.Element[];
    registry.forEach((v: string, k: string) => {
        results.push((
            <Accordion.Item className={classes.item} value={k}>
                <Accordion.Control>{k}</Accordion.Control>
                <Accordion.Panel>{v}</Accordion.Panel>
            </Accordion.Item>
        ));
    });

    return (
        <Container size="sm" className={classes.wrapper}>
            <Title align="center" className={classes.title}>
                Frequently Asked Questions
            </Title>

            <Accordion variant="separated">
                {results}
            </Accordion>
        </Container>
    );
}