import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { DcScreen } from '../components/dc/DcScreen';
import { LoginScreen } from '../components/login/LoginScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from '../components/ui/NavBar';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<MarvelScreen />} />
                    <Route path="/marvel" element={<MarvelScreen />} />
                    <Route path="/dc" element={<DcScreen />} />
                    <Route path="/search" element={<SearchScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
