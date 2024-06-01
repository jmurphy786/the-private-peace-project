import styled from 'styled-components'
import { Image } from "@nextui-org/image";
import logo from '../assets/logo.png'
import { Button } from "@nextui-org/react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const MainGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 8fr 1fr;
  grid-template-columns: 1fr 6fr 1fr;
  border : 1px solid white;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100%;
  background-color: black;
`
export const TitleName = styled.p`
  font-family: "Lucida Console", "Courier New", monospace;
  font-size: 14px;
  color: white;
  margin-top: -2px;
`

export const Body = styled.div`
  flex: 1;
  padding: 0;
`

export const Header = styled.div` 
  display: flex;
  grid-column: 1 / -1;
  grid-row: 0;
  border: 1px solid white;
  align-items: center;
`;

export const TitleBar = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10px;
  align-items: center;
`

export const NavigationButtons = styled.div`
  display:flex;
  justify-content: end;
`

export const CentrePage = styled.div`
  display: flex;
  grid-row: 2 / -1;
  grid-column: 2;
  border: 1px solid white;
`;

export const ConnectDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const HeaderText = styled.p`
  color: white;
  font-size: 20px;
  margin-bottom: 40px;
`
export default function Root() {

  const [hasLoggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const moveToPage = () => {
    navigate("/");
  }

  return (
    <Container>
      <Body>
        <MainGrid>
          <Header>
            <TitleBar >
              <Button style={{height:'80px', backgroundColor: 'black'}} onClick={moveToPage} startContent={<Image
                width={80}
                height={80} src={logo} alt="logo" />}>
                <TitleName>The Private Peace Project</TitleName>
              </Button>
            </TitleBar>
            <NavigationButtons>
              <Button color="secondary" style={{ marginRight: '20px' }}>
                Connect
              </Button>
            </NavigationButtons>
          </Header>
          <CentrePage>
            <Outlet />
          </CentrePage>
        </MainGrid>
      </Body>
    </Container>
  )
}

