import { useEffect, useState } from "react";
import { Header, HeaderText } from "./Root";

interface ILocation {
    longitude: number;
    latitude: number;
}
export default function ReceivingPage() {

    const [getLocation, setLocation] = useState<ILocation | null>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({longitude : position.coords.longitude, latitude : position.coords.latitude});
        });

    },[]);

    return(
        <div>
            {getLocation !== null ? <HeaderText>You need to allow location permissions to be able to authenticate of eligibility to receive funds</HeaderText> :
            <HeaderText>You need to allow location permissions to be able to authenticate of eligibility to receive funds</HeaderText>}
        </div>
    );
}