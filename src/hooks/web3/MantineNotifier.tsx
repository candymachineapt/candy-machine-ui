import { Anchor, Text } from "@mantine/core";
import {showNotification, updateNotification} from "@mantine/notifications";
import { IconCheck, IconThumbDown } from "@tabler/icons";
import React from "react";
//import {IWalletNotifier} from "../../services/wallet/WalletAdapter";

export class MantineNotifier //implements IWalletNotifier
    {
    showPendingTransaction(id: string, title: string, transactionHash: string): void {
        const url = "https://explorer.aptoslabs.com/txn/" + transactionHash;
        const element = <Text><Anchor href={url} target="_blank">Click to see on explorer</Anchor></Text>;

        showNotification({
            id: id,
            loading: true,
            title: title,
            message: element,
            autoClose: false,
            disallowClose: true,
        });
    }

    updateCompletedTransaction(id: string, isSuccess: boolean, title: string, message: string): void {
        const icon = (isSuccess) ? <IconCheck size={16}/> : <IconThumbDown size={16}/>;
        const color = (isSuccess) ? 'teal' : 'red';

        updateNotification({
            id: id,
            color: color,
            title: title,
            message: message,
            icon: icon,
            autoClose: 2000,
        });
    }
}