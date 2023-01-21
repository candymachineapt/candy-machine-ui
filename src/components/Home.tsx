import {SimpleGrid, Grid} from "@mantine/core";
import React from "react";
import { StatsGroup } from "./StatsGroup";
import HeroHeader from "./HeroHeader";
import { CardImage } from "./CardImage";

export default function Home() {
    return (
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <HeroHeader />
            <Grid gutter="md">
                <Grid.Col>
                    <SimpleGrid cols={3}>
                        <div>
                            <CardImage description="Begin by creating a candy machine." title="Getting started" url="/candy_machines" />
                        </div>
                        <div>
                            <CardImage description="Get information about technical details." title="Concepts" url="/concepts" />
                        </div>
                        <div>
                            <CardImage description="Find the answers to the questions you are looking for." title="FAQ" url="/faq" />
                        </div>
                    </SimpleGrid>
                </Grid.Col>
                <StatsGroup/>
            </Grid>
        </SimpleGrid>
    )
}