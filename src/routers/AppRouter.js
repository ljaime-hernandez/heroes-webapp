import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { Navbar } from '../components/ui/NavBar';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/*" element={<DashboardRoutes/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
