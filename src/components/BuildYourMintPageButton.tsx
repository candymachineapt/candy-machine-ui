import {Button} from "@mantine/core";
import {IconWreckingBall} from "@tabler/icons";

export function BuildYourMintPageButton() {
    return (
        <Button variant="light" fullWidth={true}
            href="https://github.com/candymachineapt/candy-machine-mint-page"
            component="a" target="_blank" leftIcon={<IconWreckingBall size={14}/>}>
            Build your mint page
        </Button>
    );
}