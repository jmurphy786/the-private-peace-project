import { LiquidityPool } from "../FundingPage";
import styled from 'styled-components'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

import { HeaderText } from "../Root";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MetaMaskContext } from "../MetaMaskContext";

export interface ISendToPoolProps {
    poolType: LiquidityPool
};

export const VerticalDiv = styled.div`
display: flex;
flex-direction: column;
margin-top: 20px;
`

export default function SendToPool({ poolType }: ISendToPoolProps) {

    const { metaMask } = useContext(MetaMaskContext);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const navigate = useNavigate();

    const moveToPage = () => {
        if (metaMask)
            navigate('/select');
        else
            navigate("/");
    }

    return (
        <VerticalDiv>
            <div style={{ marginTop: '40px' }}>
            </div>
            <Input isReadOnly style={{ color: 'white' }} type='email' label={<HeaderText>Eth Donation</HeaderText>} color='secondary' variant="bordered" defaultValue="1" />
            <VerticalDiv style={{ alignItems: 'end' }}>
                <Button style={{ marginTop: '20px', width: '90px' }} color='secondary' onPress={onOpen}> Donate ($)</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Donation Successful</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Thank you so much for your donation($)!
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={() => { onClose(); moveToPage(); }}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </VerticalDiv>
        </VerticalDiv>
    )
}