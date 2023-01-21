import {Pagination, Table} from "@mantine/core";
import { useEffect, useState } from "react";
import {AptosTokenData} from "../services/aptos/client/AptosTypes";
import {TokenData} from "./TokenData";

interface TokenDatasProps {
    tokenDatas: AptosTokenData[];
}

export function TokenDatas({tokenDatas}: TokenDatasProps) {
    const pageSize = 5;
    
    const total = Math.ceil(tokenDatas.length/pageSize);
    const [result, setResult] = useState<JSX.Element[]>();
    const [activePage, setPage] = useState(1);

    useEffect(() => {
        const startIndex = (activePage-1)*pageSize;
        if(activePage!==total) {
            setResult(tokenDatas.slice(startIndex, startIndex + pageSize).map((tokenData: AptosTokenData) => <TokenData {...tokenData} key={tokenData.id.name}/>));
        } else {
            setResult(tokenDatas.slice(startIndex).map((tokenData: AptosTokenData) => <TokenData {...tokenData} key={tokenData.id.name}/>));
        }        
        
    }, [activePage, tokenDatas]);

    return (
        <>
            <Table highlightOnHover withColumnBorders>
                <thead>
                <tr>
                    <th>Preview</th>
                    <th>Collection</th>
                    <th>Name</th>
                    <th>Maximum</th>
                    <th>Description</th>
                    <th>Royalty Fee (%)</th>
                    <th>Royalty Payee Address</th>
                    <th>Attributes</th>
                </tr>
                </thead>
                <tbody>{result}</tbody>
            </Table>
            <Pagination mt="md" page={activePage} onChange={setPage} total={total} withEdges position="center" />
        </>
    )
}