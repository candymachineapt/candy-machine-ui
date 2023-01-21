import { Card, Center, Loader } from '@mantine/core';
import React, {useCallback, useEffect, useState} from "react";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import {CandyMachineInfo} from '../services/aptos/client/AptosTypes';
import {CandyMachineCard} from './CandyMachineCard';

interface CandyMachineProps {
    address: string;
}

export function CandyMachine({address}: CandyMachineProps) {
    const {candyMachineService} = useAptosClient();
    const [isLoaded, setLoaded] = useState(false);
    const [candyMachineInfo, setCandyMachineInfo] = useState<CandyMachineInfo | null>(null);

    const refreshCandyMachineInfoCallback = useCallback(() => {
        setLoaded(false);
        candyMachineService.getCandyMachineInfo(address)
            .then(info => {
                console.log(info);
                setCandyMachineInfo(info);
                setLoaded(true);
            });
    }, [address, candyMachineService, setCandyMachineInfo, setLoaded]);

    useEffect(() => {
        refreshCandyMachineInfoCallback();
    }, [refreshCandyMachineInfoCallback])

    const showCard = isLoaded && candyMachineInfo;

    return (
        <>
            {!showCard &&
                <Card shadow="sm" p="lg" radius="md" withBorder><Center style={{height: 200}}><Loader/></Center></Card>
            }

            {showCard &&
                <CandyMachineCard candyMachineInfo={candyMachineInfo} onChangeCallback={refreshCandyMachineInfoCallback}/>
            }
        </>
    );
}