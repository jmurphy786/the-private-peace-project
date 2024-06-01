import { Button } from "@nextui-org/react";
import { ConnectDiv, HeaderText } from "./Root";
import { useNavigate } from "react-router-dom";
import MetaMaskSDK from "@metamask/sdk";

export default function Connect() {

    const MMSDK = new MetaMaskSDK({
        dappMetadata: {
            name: "Example JavaScript Dapp",
            url: window.location.href,
        },
        infuraAPIKey: '3e104cfcc08e454ab7c0a3d4f90a1281',
        // Other options.
    });

    // You can also access via window.ethereum.
    const ethereum = MMSDK.getProvider();


    const navigate = useNavigate();
    const onConnectClick = () => {
        ethereum?.request({ method: "eth_requestAccounts", params: [] }).catch((e) => {
        }).finally(() => {
            navigate("/select");
        });
    }
    return (
        <ConnectDiv>
            <HeaderText>Click Here to connect via Metamask Wallet</HeaderText>
            <Button color="secondary" style={{ marginRight: '20px' }} onClick={onConnectClick}>Connect To Metamask</Button>
        </ConnectDiv>
    );
}