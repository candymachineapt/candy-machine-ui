import {Pagination, Table} from "@mantine/core";
import { useEffect, useState } from "react";
import {AptosTokenData} from "../services/aptos/client/AptosTypes";
import { OffChainTokenTableRow } from "./OffChainTokenTableRow";

interface OffChainTokenTableProps {
    tokenDatas: AptosTokenData[];
    header: boolean,
    paging: boolean
}

export function OffChainTokenTable({tokenDatas, header, paging}: OffChainTokenTableProps) {
    const pageSize = 3;
    
    const total = Math.ceil(tokenDatas.length/pageSize);
    const [result, setResult] = useState<JSX.Element[]>();
    const [activePage, setPage] = useState(1);

    useEffect(() => {
        const startIndex = (activePage-1)*pageSize;
        if(activePage!==total) {
            setResult(tokenDatas.slice(startIndex, startIndex + pageSize).map((tokenData: AptosTokenData) => <OffChainTokenTableRow {...tokenData} key={tokenData.name}/>));
        } else {
            setResult(tokenDatas.slice(startIndex).map((tokenData: AptosTokenData) => <OffChainTokenTableRow {...tokenData} key={tokenData.name}/>));
        }        
        
    }, [activePage, tokenDatas]);
    return (
        <>
        <Table highlightOnHover withColumnBorders>
            { header &&
            <thead>
                <tr>
                    <th>Preview</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Attributes</th>
                </tr>
            </thead>
            }
            <tbody>{result}</tbody>
        </Table>
        { paging &&
            <Pagination mt="md" page={activePage} onChange={setPage} total={total} withEdges position="center" />
        }
        </>
    )
}