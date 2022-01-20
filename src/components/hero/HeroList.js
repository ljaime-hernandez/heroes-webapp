import { useMemo } from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher"
import { HeroCard } from "./HeroCard";

// we receive a string as parameter on the HeroList component which will be used
// as argument on the getHeroesByPublisher selector, this will return an 
// array of object all containing the same publishers on it
export const HeroList = ({publisher}) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn ">
                {
                    heroes.map(hero => (
                        
                        <HeroCard 
                            key={hero.id}
                            // the hero itself will contain several data values,
                            // instead of passing them to the next component one by one,
                            // we can simply use the spread operator for the whole
                            // object to be sent all together
                            {...hero}
                        />
                    ))
                }
        </div>
    )
}
