import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    {/* we do some public routes handling with our PublicRoute component, it will
                     become the 'parent' of the LoginScreen component in this example, as that should be
                     the only public page in this webapp*/}
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen/>
                    </PublicRoute>}/>

                    {/* we do some private routes handling with our PrivateRoute component, it will
                     become the 'parent' of the DashboardRoutes component in this example, as those will be
                     the private pages in this webapp*/}
                <Route path="/*" element={
                    <PrivateRoute>
                        <DashboardRoutes/>
                    </PrivateRoute>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
