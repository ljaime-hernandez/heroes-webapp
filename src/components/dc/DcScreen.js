import React from 'react';
import { HeroList } from '../hero/HeroList';

export const DcScreen = () => {
    return (
        <div>
            <h1>DC Screen</h1>
            {/*we add the default string as parameter on this component for it to trigger 
               actions on the HeroList component */}
            <HeroList publisher={'DC Comics'}/>

        </div>
    )
}
