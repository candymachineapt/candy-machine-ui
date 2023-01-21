import {ActionIcon, Button, CopyButton, Modal, Portal, TextInput, Tooltip} from "@mantine/core";
import {IconCheck, IconCopy, IconShare} from "@tabler/icons";
import {useState} from "react";

interface ShareMintPageProps {
    candyMachineAddress: string;
}

export function ShareMintPage({candyMachineAddress}: ShareMintPageProps) {
    const [opened, setOpened] = useState(false);
    const url = "https://candymachine.app/candy_machine/" + candyMachineAddress;

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setOpened(true);
    }

    return (
        <>
            <Button variant="light" onClick={handleSubmit} fullWidth={true} leftIcon={<IconShare size={14}/>}>Share Mint
                Page</Button>
            <Portal>
                <Modal

                    withCloseButton={false}
                    centered
                    opened={opened}
                    onClose={() => setOpened(false)}>
                    <CopyButton value={url} timeout={2000}>
                        {({copied, copy}) => (
                            <TextInput disabled={true} label="Public Mint Page Url" variant="filled" rightSection={(
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                    <ActionIcon aria-label={url} color={copied ? 'teal' : 'gray'} onClick={copy}>
                                        {copied ? <IconCheck size={16}/> : <IconCopy size={16}/>}
                                    </ActionIcon>
                                </Tooltip>)} value={url}/>
                        )}
                    </CopyButton>
                </Modal>
            </Portal>
        </>
    )
}

