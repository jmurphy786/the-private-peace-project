import { LiquidityPool } from "../FundingPage";
import styled from 'styled-components'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { HeaderText } from "../Root";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MetaMaskContext } from "../MetaMaskContext";
import { Contract, utils, BigNumber, providers } from "ethers";
import { PPP_ABI, PPP_CONTRACT_ADDRESS } from "../../constants";
import { buildMimc7 as buildMimc } from 'circomlibjs';
const { ethereum } = window as any;

export interface ISendToPoolProps {
    poolType: LiquidityPool
};

function toHexString(byteArray: Uint8Array): string {
    return '0x' + Array.from(byteArray, byte => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

const depositClick = async () => {
    await deposit();
    open()
}

const deposit = async () => {
    try {
    
        // Generate commitment for deposit function
        const nullifier = utils.randomBytes(32);
        const secret = utils.randomBytes(32);
        const mimc = await buildMimc();
        const note = mimc.multiHash([nullifier, secret]);
        const noteHex = toHexString(note);

        const noteValue = BigNumber.from(noteHex).mod(BigNumber.from("21888242871839275222246405745257275088548364400416034343698204186575808495617")).toHexString();

        const provider = new providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();

        const PPPcontract = new Contract(
            PPP_CONTRACT_ADDRESS,
            PPP_ABI,
            signer
        );
        const tx = await PPPcontract.deposit(noteValue,
        {
            value: utils.parseEther("0.01"),
        });

        await tx.wait();
    } catch (err) {
        console.error(err);
    }
  };

  export const VerticalDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`
export default function SendToPool({ poolType }: ISendToPoolProps) {

  const {metaMask} = useContext(MetaMaskContext);


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
                <Button style={{ marginTop: '20px', width: '90px' }} color='secondary' onPress={depositClick}> Donate ($)</Button>
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