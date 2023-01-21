import React from 'react';
import {Avatar, ColorScheme } from '@mantine/core';

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
    return (
        <Avatar size="sm" src="/logo512.png" />
    );
}