import {ActionIcon, Group, useMantineTheme} from "@mantine/core";
import {IconBrandGithub, IconBrandTwitter} from "@tabler/icons";

export function SocialLinks() {
    const theme = useMantineTheme();
    return (
        <Group spacing={10} position="center" noWrap>
            <ActionIcon variant="default" color={theme.colorScheme === 'dark' ? "dark" : ""} size="lg" component="a" target="_blank" href="https://github.com/candymachineapt">
                <IconBrandGithub size={24} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="default" color={theme.colorScheme === 'dark' ? "dark" : ""} size="lg" component="a" target="_blank" href="https://twitter.com/candymachineapp">
                <IconBrandTwitter size={24} stroke={1.5} />
            </ActionIcon>
        </Group>
    );
}