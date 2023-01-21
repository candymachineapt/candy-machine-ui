import React, {useState} from 'react';
import {
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
    ColorSchemeProvider,
    ColorScheme,
    MantineProvider,
    Container,
} from '@mantine/core';

import {MainLinks} from './_mainLinks';
import {User} from './_user';
import {Brand} from './_brand';

import {AptosClientProvider} from './hooks/aptosClient/AptosClientProvider';
import Main from './Main';
import {NotificationsProvider} from "@mantine/notifications";
import {useLocalStorage} from '@mantine/hooks';
import {WalletProviderAdapter} from './hooks/web3/WalletProviderAdapter';
import { NetworkAdapter } from './hooks/web3/NetworkAdapter';

function App() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'color-scheme',
        defaultValue: 'light',
    });

    const toggleColorScheme = () =>
        setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <AptosClientProvider>
            <WalletProviderAdapter>
                <NetworkAdapter>
                    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                        <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                            <NotificationsProvider limit={5}>
                                <AppShell
                                    navbarOffsetBreakpoint="sm"
                                    asideOffsetBreakpoint="sm"
                                    navbar={
                                        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened}
                                                width={{sm: 200, lg: 300}}>
                                            <Navbar.Section grow mt="md">
                                                <MainLinks/>
                                            </Navbar.Section>
                                            <Navbar.Section>
                                                <User/>
                                            </Navbar.Section>
                                        </Navbar>
                                    }
                                    header={
                                        <Header height={{base: 100, md: 50}} p="md">
                                            <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                                                    <Burger
                                                        opened={opened}
                                                        onClick={() => setOpened((o) => !o)}
                                                        size="sm"
                                                        color={theme.colors.gray[6]}
                                                        mr="xl"
                                                    />
                                                </MediaQuery>
                                                <Brand/>
                                            </div>
                                        </Header>
                                    }
                                >
                                    <Container fluid={true}>
                                        <Main/>
                                    </Container>
                                </AppShell>
                            </NotificationsProvider>
                        </MantineProvider>
                    </ColorSchemeProvider>
                </NetworkAdapter>
            </WalletProviderAdapter>
        </AptosClientProvider>
    );
}

export default App;
