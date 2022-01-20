import React from 'react';
import { HeroList } from '../hero/HeroList';

export const MarvelScreen = () => {
    return (
        <div>
            <h1>Marvel Screen</h1>
            {/*renders the HeroList component with a default string which will trigger
               a series of processes on the component*/}
            <HeroList publisher={'Marvel Comics'}/>

        </div>
    )
}
