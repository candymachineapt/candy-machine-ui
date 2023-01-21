import React from 'react';
import {Group, useMantineColorScheme, Box, Text, SegmentedControl, Center} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons';
import { Logo } from './_logo';

export function Brand() {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();

    return (
        <Box style={{width:'100%'}} >
            <Group position="apart">
                <Group position="left"  my="xl">
                    <Logo colorScheme={colorScheme} />
                    <Text ta="center" fz="xl" fw={700}>Candy Machine</Text>
                </Group>
                <Group position="apart"  my="xl">
                    <SegmentedControl
                        value={colorScheme}
                        onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
                        data={[
                        {
                            value: 'light',
                            label: (
                                    <Center>
                                        <IconSun size={16} stroke={1.5} />
                                        <Box ml={10}>Light</Box>
                                    </Center>
                                    ),
                        },
                        {
                            value: 'dark',
                            label: (
                                    <Center>
                                        <IconMoon size={16} stroke={1.5} />
                                        <Box ml={10}>Dark</Box>
                                    </Center>
                                    ),
                        },
                        ]}
                    />
                </Group>
            </Group>
        </Box>
    );
}