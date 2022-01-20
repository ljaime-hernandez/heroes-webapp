import {Routes, Route} from 'react-router-dom';
import { DcScreen } from "../components/dc/DcScreen";
import { Hero } from '../components/hero/Hero';
import { MarvelScreen } from "../components/marvel/MarvelScreen";
import { SearchScreen } from "../components/search/SearchScreen";
import { Navbar } from "../components/ui/NavBar";

export const DashboardRoutes = () => {
    return (
        <>
         <Navbar/>   
        <div className='container'>
            <Routes>
                <Route path="marvel" element={<MarvelScreen />} />
                <Route path="dc" element={<DcScreen />} />
                <Route path="search" element={<SearchScreen />} />
                {/*the colons on the hero path allow us to use an extra parameter on the link used
                   to render this component, the parameter can then be retrieved by a method used
                   later on for additional processes, please check the Hero component for extra information */}
                <Route path="hero/:heroId" element={<Hero />} />
                <Route path="/" element={<MarvelScreen />} />
            </Routes>
        </div>
        </>
    )
}