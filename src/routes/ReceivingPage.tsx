import { CentreDiv, SidePanel } from "./SelectionPage";
import { HeaderText } from './Root';
import { Button, Image } from "@nextui-org/react";
import palestine from '../assets/palestine.jpg'
import ukraine from '../assets/ukraine.png'
import { useEffect, useState } from "react";
import { LiquidityPool } from "./FundingPage";

interface ILocation {
    longitude: number;
    latitude: number;
}
export default function ReceivingPage() {

    const [getLocation, setLocation] = useState<ILocation | null>();

    const palestineWallets = ['', ''];
    const ukraineWallets = ['', ''];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude });
        });

    }, []);

    return (
        <div>
            <HeaderText style={{ textAlign: 'center', marginTop: '20px' }}>Select a region that </HeaderText>

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <SidePanel>
                    <CentreDiv>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <Button style={{ width: '300px', height: '200px', backgroundColor: 'black' }}  isIconOnly aria-label="Like">
                                <Image style={{ marginTop: '30px' }} src={palestine} alt="logo" />
                            </Button>
                        </div>
                    </CentreDiv>
                </SidePanel>
                <SidePanel>
                    <CentreDiv>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button style={{ width: '300px', height: '200px', backgroundColor: 'black' }}  isIconOnly aria-label="Like">
                                <Image style={{ marginTop: '30px' }} src={ukraine} alt="logo" />
                            </Button>
                        </div>
                    </CentreDiv>
                </SidePanel>
            </div>
        </div>
    );
}