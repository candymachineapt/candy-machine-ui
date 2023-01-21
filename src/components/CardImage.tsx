import { createStyles, Paper, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    card: {
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF ${theme.fontFamily}`,
        fontWeight: 600,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,
    },

    description: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

interface ArticleCardImageProps {
    title: string;
    description: string;
    url: string;
}

export function CardImage({ title, description, url }: ArticleCardImageProps) {
    const navigate = useNavigate();
    const { classes, theme } = useStyles();

    return (
        <Paper component="a" href="#" onClick={() => navigate(url)} p="xl" radius="md" className={classes.card}
            sx={{  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0] }}>
            <div>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
                <Text className={classes.description} mt="md" size="xs">
                    {description}
                </Text>
            </div>
        </Paper>
    );
}