import { Button } from "@nextui-org/react";
import { CentrePage, ConnectDiv, HeaderText } from "./Root";
import { useNavigate } from "react-router-dom";

export default function Connect(){
    const navigate = useNavigate();
    const onConnectClick = () => {
        navigate("/select");
    }
    return(
        <ConnectDiv>
          <HeaderText>Click Here to connect via Metamask Wallet</HeaderText>
          <Button color="secondary" style={{ marginRight: '20px' }} onClick={onConnectClick}>Connect To Metamask</Button>
        </ConnectDiv>
    );
}