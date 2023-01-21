import {Container, createStyles, Text, Space, Anchor} from "@mantine/core";
import React from "react";

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
    },

    inner: {
        position: 'relative',

        [BREAKPOINT]: {
            paddingBottom: 80,
            paddingTop: 80,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 48,
        fontWeight: 800,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [BREAKPOINT]: {
            fontSize: 42,
            lineHeight: 1.2,
        },
    },

    description: {
        marginTop: theme.spacing.xl,
        fontSize: 24,

        [BREAKPOINT]: {
            fontSize: 18,
        },
    },

    controls: {
        marginTop: theme.spacing.xl * 2,

        [BREAKPOINT]: {
            marginTop: theme.spacing.xl,
        },
    },

    control: {
        height: 54,
        paddingLeft: 38,
        paddingRight: 38,

        [BREAKPOINT]: {
            height: 54,
            paddingLeft: 18,
            paddingRight: 18,
            flex: 1,
        },
    },
}));

export default function HeroHeader() {
const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A fast, secure and efficient NFT orchestration app
        </h1>

        <Text className={classes.description} color="dimmed">
            The Candy machine project is inspired by real-world candy machines,
            it is an autonomous machine that allows anyone to toss a coin and randomly select from
            various
            candies inside.
            Another source of inspiration for this project is the candy machine setup in solana. So we
            adapted
            them to the aptos.
            We follow the rules of <Anchor href="https://aptos.dev/concepts/coin-and-token/aptos-token"
                                           target="_blank">aptos token</Anchor> documents.
            <Space h="xs"/>
            The project made it easy for anyone to create an nft collection and put it up for sale.
            It is also intended that the creator of collection do this with the least amount of mistakes
            and that those who buy the NFTs feel safe.
            For now, only NFT collection of candy machines can be produced, but in the future,
            we also included the mystery box concept in our roadmap.
            <Space h="xs"/>
            We are still developing the project so feel free to give a feedback.
        </Text>
      </Container>
    </div>
    );
}