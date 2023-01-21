import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { Text } from '@mantine/core';

export function WalletAddressText() {
    const {account} = useWallet();

    return (
        <Text>{account?.address?.toString()}</Text>
    );
}