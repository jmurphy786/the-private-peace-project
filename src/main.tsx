import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from "@nextui-org/react";
import './index.css'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root.tsx';
import SelectionPage from './routes/SelectionPage.tsx';
import Connect from './routes/Connect.tsx';
import FundingPage from './routes/FundingPage.tsx';
import ReceivingPage from './routes/ReceivingPage.tsx';
import App from './App.tsx';
import { RecoilRoot } from 'recoil';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    <Route index element={<Connect/>}></Route>
    <Route path = 'select' element={<SelectionPage/>}/>
    <Route path = 'funding' element={<FundingPage/>}/>
    <Route path = 'receive' element={<ReceivingPage/>}/>
  </Route>
));


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <NextUIProvider>
    <RecoilRoot>
      <App/>
    </RecoilRoot>
    </NextUIProvider>
  </React.StrictMode>,
)
