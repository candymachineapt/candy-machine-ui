import {Grid} from "@mantine/core";
import {AptosCollection} from "../services/aptos/client/AptosTypes";
import {Collection} from "./Collection";

interface CollectionsProps {
    collections: AptosCollection[];
}

export function Collections({collections}: CollectionsProps) {
    const result = collections.map((collection: AptosCollection) => <Collection {...collection}
                                                                                key={collection.collection_name}/>);
    return (
        <Grid p="sm">{result}</Grid>
    )
}