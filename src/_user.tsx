import React from 'react';
import {Text, Box, Divider, Image, useMantineTheme, Space} from '@mantine/core';
import {WalletConnectButton} from './components/web3/WalletConnectButton';
import { SocialLinks } from './components/SocialLinks';

export function User() {
    const theme = useMantineTheme();

    return (
        <Box
            sx={{
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${
                    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            }}
        >
            <WalletConnectButton/>
            <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <Text>Built on</Text>
                        <Space w="xs"/>
                        <Image
                            height={15}
                            width={41}
                            src={theme.colorScheme === 'dark' ? "/aptos_word_dark.svg" : "/aptos_word.svg"}
                        />
                    </>
                }
            />
            <SocialLinks />
        </Box>
    );
}