import { CentreDiv } from "./SelectionPage";
import { HeaderText } from './Root';
import { Button, Image, Textarea } from "@nextui-org/react";
import send from '../assets/send.png'
import { useEffect, useState } from "react";
import { LiquidityPool } from "./FundingPage";
import { VerticalDiv } from "./components/SendToPool";
import palestine from '../assets/palestine.jpg'
import ukraine from '../assets/ukraine.png'
import { useNavigate, useParams } from "react-router-dom";
import {
    Client,
    useStreamMessages,
    useClient,
    useMessages,
    useConversations,
    useCanMessage,
    useStartConversation,
    InitializeClientOptions
} from "@xmtp/react-sdk";

interface ILocation {
    longitude: number;
    latitude: number;
}

type IParams = {
    id: string | undefined
}

export default function ReceivingPage() {
    const { id } = useParams<IParams>();
    // const { client, initialize } = useClient();
    const { conversations } = useConversations();
    const { startConversation } = useStartConversation();
    const { canMessage } = useCanMessage();

    const [getLocation, setLocation] = useState<ILocation | null>();

    const [region, setRegion] = useState<LiquidityPool | null>(LiquidityPool.Ukraine);
    const navigate = useNavigate();

    // const initXmtp = async () => {
    //     const options = {
    //         persistConversations: false,
    //         env: "dev",
    //     };
    //     await initialize({ keys, options, signer } : InitializeClientOptions);
    // };

    // // Start a conversation with XMTP
    // const add = "0x3F11b27F323b62B159D2642964fa27C46C841897";
    // if (await canMessage(add)) {
    //     const conversation = await startConversation(add, "hi");
    // }

    // //Stream messages
    // const [history, setHistory] = useState(null);
    // const { messages } = useMessages(conversation);
    // // Stream messages
    // const onMessage = useCallback((message) => {
    //     setHistory((prevMessages) => {
    //         const msgsnew = [...prevMessages, message];
    //         return msgsnew;
    //     });
    // }, []);
    // useStreamMessages(conversation, { onMessage });


    useEffect(() => {
        if (!id) {
            navigate('/receive-region');
        }
        if (id)
            setRegion(parseInt(id));
    }, [id])

    const moveToPage = (value: string) => {
        navigate("/" + value);
    }

    const palestineWallets = ['', ''];
    const ukraineWallets = ['', ''];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
        });
    }, []);

    function getImageFromRegion(region: LiquidityPool | null) {
        switch (region) {
            case LiquidityPool.Palestine:
                return palestine;
            case LiquidityPool.Ukraine:
                return ukraine;
            default:
                return "";
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <VerticalDiv>
                <CentreDiv style={{ width: '100%' }}>
                    <Image style={{ marginLeft: '0px', height: '60px', width: '120px' }} src={getImageFromRegion(region)} alt="logo" />
                </CentreDiv>
                <CentreDiv style={{ width: '100%' }}>
                    <HeaderText style={{ marginTop: '30px' }}>Withdraw Address Confirmed</HeaderText>
                </CentreDiv>
                <Textarea
                    isDisabled={true}
                    style={{ color: 'white', minWidth: '600px', height: '350px' }}
                    color='default'
                    disableAutosize
                    variant="bordered"
                    label={<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}><HeaderText style={{ fontSize: '15px', marginBottom: '2px' }}>XMTP Message</HeaderText></div>}
                    labelPlacement="outside"
                    placeholder="Enter your description"
                />

                <CentreDiv style={{ alignItems: 'end', justifyContent: 'end', marginTop: '10px' }}>
                    <Button style={{ width: '35px', height: '35px' }} color='secondary' isIconOnly aria-label="Like">
                        <Image src={send} height={25} width={25} alt="logo" />
                    </Button>
                </CentreDiv>

                <CentreDiv style={{ alignContent: 'end', justifyContent: 'end', marginTop: '100px' }}>
                    <Button style={{ width: '200px' }} color='secondary' isDisabled={true}>Withdraw</Button>
                </CentreDiv>
            </VerticalDiv>
        </div>
    );
}