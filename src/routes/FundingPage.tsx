import { CentreDiv, SidePanel } from "./SelectionPage";
import styled from 'styled-components'
import { HeaderText } from './Root';
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/react";
import palestine from '../assets/palestine.jpg'
import ukraine from '../assets/ukraine.png'
import { useState } from "react";

export default function FundingPage() {
    enum LiquidityPool {
        Palestine,
        Ukraine
    }
    const [getLiquidityPool, setLiquidityPool] = useState<LiquidityPool | null>(null);


    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <HeaderText style={{ textAlign: 'center', marginTop: '20px' }}>Select a liquidity pool to donate to...</HeaderText>

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <SidePanel>
                    <CentreDiv>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <Button style={{ width: '300px', height: '200px', backgroundColor: 'black' }} onClick={() => setLiquidityPool(LiquidityPool.Palestine)} isIconOnly aria-label="Like">
                                <Image style={{ marginTop: '30px' }} src={palestine} alt="logo" />
                            </Button>
                            {
                                getLiquidityPool === LiquidityPool.Palestine ?
                                    <HeaderText style={{marginTop:'10px'}}>You have selected Palestine</HeaderText>
                                    :
                                    <div>
                                    </div>
                            }
                        </div>
                    </CentreDiv>
                </SidePanel>
                <SidePanel>
                    <CentreDiv>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button style={{ width: '300px', height: '200px', backgroundColor: 'black' }} onClick={() => setLiquidityPool(LiquidityPool.Ukraine)} isIconOnly aria-label="Like">
                                <Image style={{ marginTop: '30px' }} src={ukraine} alt="logo" />
                            </Button>
                            {
                                getLiquidityPool === LiquidityPool.Ukraine ?
                                    <HeaderText style={{marginTop:'10px'}}>You have selected Ukraine</HeaderText>
                                    :
                                    <div>
                                    </div>
                            }
                        </div>
                    </CentreDiv>
                </SidePanel>
            </div>
        </div>
    )
}