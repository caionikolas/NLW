'use client';

import { Route, Routes ,BrowserRouter } from 'react-router-dom'; 

import Home from '@/components/Home/home';
import CreatePoint from '@/components/CreatePoint/createPoint';

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Home} path="/"/>
                <Route Component={CreatePoint} path="/create-point"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Pages;