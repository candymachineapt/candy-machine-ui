import React from 'react';
import {
    IconBuildingLighthouse,
    IconBuildingWarehouse,
    IconEggCracked,
    IconGeometry,
    IconHome2,
    IconMessageCircle,
    IconStairsUp
} from '@tabler/icons';
import {ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    to: string;
}

function MainLink({ icon, color, label, to }: MainLinkProps) {
    const navigate = useNavigate();
    return (
            <UnstyledButton
                onClick={() => navigate(to)}
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
                >
                <Group>
                    <ThemeIcon color={color} variant="light">
                        {icon}
                    </ThemeIcon>
                    <Text size="sm">{label}</Text>
                </Group>
            </UnstyledButton>
            );
}

const data = [
    { icon: <IconHome2 size={16} />, color: 'orange', label: 'Home', to: '/' },
    { icon: <IconEggCracked size={16} />, color: 'cyan', label: 'Mint Page', to: '/candy_machine' },
    { icon: <IconBuildingWarehouse size={16} />, color: 'pink', label: 'My Candy Machines', to: '/candy_machines' },
    { icon: <IconGeometry size={16} />, color: 'violet', label: 'Concepts', to: '/concepts' },
    { icon: <IconStairsUp size={16} />, color: 'green', label: 'Tutorial', to: '/tutorial' },
    { icon: <IconBuildingLighthouse size={16} />, color: 'yellow', label: 'FAQ', to: '/faq' },
    { icon: <IconMessageCircle size={16} />, color: '', label: 'Feedback', to: '/feedback' },

];

export function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
}