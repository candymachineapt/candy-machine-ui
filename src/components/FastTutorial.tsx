import {Container, Timeline, Title, Text, Image, Space} from "@mantine/core";
import { IconNorthStar } from "@tabler/icons";

export default function FastTutorial() {

    return (
        <Container size="sm">
            <Title align="center" mb="md">
                Fast Tutorial
            </Title>

            <Timeline active={999} bulletSize={24} lineWidth={4}>
                <Timeline.Item bullet={<IconNorthStar size={12} />} title="Create candy machine">
                    <Image
                        height={200}
                        fit="contain"
                        src="/tutorial/1.png"
                        withPlaceholder
                        caption="Go to 'My Candy Machines' page and click 'Create Candy Machine' button at the right hand side"
                        mb="md"
                        mt="md"
                    />
                    <Image
                        height={200}
                        fit="contain"
                        src="/tutorial/2.png"
                        withPlaceholder
                        caption="Approve transaction"
                        mb="md"
                    />
                    <Image
                        height={200}
                        fit="contain"
                        src="/tutorial/3.png"
                        withPlaceholder
                        caption="Click 'Settings' button on candy machine that created"
                        mb="md"
                    />
                </Timeline.Item>
                <Timeline.Item bullet={<IconNorthStar size={12} />} title="Create collection">
                    <Image
                        height={300}
                        fit="contain"
                        src="/tutorial/4.png"
                        withPlaceholder
                        caption="Click 'Create Collection' at the right hand side on candy machine page"
                        mb="md"
                        mt="md"
                    />
                    <Image
                        height={300}
                        fit="contain"
                        src="/tutorial/5.png"
                        withPlaceholder
                        caption="Fill the required areas. In this tutorial, we will imitate the first 1000 pieces of the 'Aptos Flip' collection."
                        mb="md"
                    />
                    <Image
                        height={300}
                        fit="contain"
                        src="/tutorial/6.png"
                        withPlaceholder
                        caption="Approve transaction"
                        mb="md"
                    />
                    <Image
                        height={200}
                        fit="contain"
                        src="/tutorial/7.png"
                        withPlaceholder
                        caption="You able to see the collection you created"
                        mb="md"
                    />
                </Timeline.Item>
                <Timeline.Item bullet={<IconNorthStar size={12} />} title="Create tokens with fast way">
                    <Image
                        height={600}
                        fit="contain"
                        src="/tutorial/8.png"
                        withPlaceholder
                        caption={(<Text>
                            Let's use the arweave urls of the existing collection on the mainnet.
                            <Space h="xs"/>
                            https://nvt6em7r3352yszgpj74wngiztsnj5fl7n7o3ilkqvvmd7ccdu7q.arweave.net/bWfiM_He-6xLJnp_yzTIzOTU9Kv7fu2haoVqwfxCHT8/0.json
                            <Space h="xs"/>
                            as start url and
                            <Space h="xs"/>
                            https://nvt6em7r3352yszgpj74wngiztsnj5fl7n7o3ilkqvvmd7ccdu7q.arweave.net/bWfiM_He-6xLJnp_yzTIzOTU9Kv7fu2haoVqwfxCHT8/999.json
                            <Space h="xs"/>
                            as end url. Then click 'Upload Tokens' button.
                        </Text>
                        )}
                        mb="md"
                        mt="md"
                    />
                    <Image
                        height={600}
                        fit="contain"
                        src="/tutorial/9.png"
                        withPlaceholder
                        caption="You able to see first and last tokens of urls. Then click 'Edit & Save' button."
                        mb="md"
                    />
                    <Image
                        height={400}
                        fit="contain"
                        src="/tutorial/10.png"
                        withPlaceholder
                        caption="Fill the required areas. Choose which collection the tokens belong to.
                        Fill royalty informations (royalties to be paid by the buyer on nft sales). Then click 'Create' button."
                        mb="md"
                    />
                    <Image
                        height={300}
                        fit="contain"
                        src="/tutorial/11.png"
                        withPlaceholder
                        caption="At this stage, we both generate tokens on the chain and add them to the candy machine.
                        Approve transaction. Depending on the amount of importing tokens, gas fees can be very high."
                        mb="md"
                    />
                    <Image
                        height={300}
                        fit="contain"
                        src="/tutorial/12.png"
                        withPlaceholder
                        caption="After all this, there are candies in the machine and it's ready."
                        mb="md"
                    />
                </Timeline.Item>
                <Timeline.Item bullet={<IconNorthStar size={12} />} title="Start candy machine">
                    <Image
                        height={400}
                        fit="contain"
                        src="/tutorial/13.png"
                        withPlaceholder
                        caption="Click 'Start' button."
                        mb="md"
                        mt="md"
                    />
                    <Image
                        height={200}
                        fit="contain"
                        src="/tutorial/14.png"
                        withPlaceholder
                        caption="Approve transaction"
                        mb="md"
                    />
                    <Image
                        height={600}
                        fit="contain"
                        src="/tutorial/15.png"
                        withPlaceholder
                        caption="The candy machine is running.
                        You can either use it with the 'Mint' button or make it available to others with the sharing mint page."
                        mb="md"
                    />
                </Timeline.Item>
                <Timeline.Item bullet={<IconNorthStar size={12} />} title="Mint a token to yourself">
                    <Image
                        height={400}
                        fit="contain"
                        src="/tutorial/16.png"
                        withPlaceholder
                        caption="Approve transaction.
                        Martian displays an image of what could happen if it is approved at the approval stage.
                        The token obtained after confirming will be different."
                        mb="md"
                        mt="md"
                    />
                    <Image
                        height={400}
                        fit="contain"
                        src="/tutorial/17.png"
                        withPlaceholder
                        mb="md"
                    />
                    <Image
                        height={400}
                        fit="contain"
                        src="/tutorial/18.png"
                        withPlaceholder
                        caption="The token created to wallet after mint."
                        mb="md"
                    />
                </Timeline.Item>

            </Timeline>
        </Container>
    );
}