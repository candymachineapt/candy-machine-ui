import { Center, Loader, Text } from "@mantine/core";
import React, {ReactNode, useCallback} from "react";
import {Async} from "react-async";
import useAptosClient from "../hooks/aptosClient/useAptosClient";
import { useParams } from "react-router-dom";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

interface PrivateRouterPageProps {
    children: ReactNode;
}

const PrivateRouterPage = ({children}: PrivateRouterPageProps) => {
    const {candyMachineAddress} = useParams();
    const {account} = useWallet();
    const {candyMachineService} = useAptosClient();

    const authorizationCheck = useCallback(async () => {
        if (!candyMachineAddress) {
            throw new Error("Candy machine address invalid");
        }

        if (account?.address === null || account?.address === undefined) {
            throw new Error("Please connect your wallet");
        }

        let result = false;
        try {
            const candyMachineInfo = await candyMachineService.getCandyMachineInfo(candyMachineAddress);

            if (candyMachineInfo === null) {
                throw new Error("Candy machine not found");
            }

            result = candyMachineInfo.creator === account.address.toString();
        } catch(e) {
            if (e instanceof Error) {
                throw e;
            }

            throw new Error("Could not fetch candy machine info");
        }

        if (!result) {
            throw new Error("Access denied");
        }
    }, [candyMachineAddress, account, candyMachineService]);

    return (
        <Async promiseFn={authorizationCheck}>
            <Async.Pending><Center style={{height: 200}}><Loader/></Center></Async.Pending>
            <Async.Fulfilled>{(result: any) => children}</Async.Fulfilled>
            <Async.Rejected>{error => <Text>Something went wrong: {error.message}</Text>}</Async.Rejected>
        </Async>
    );
}

export default PrivateRouterPage;