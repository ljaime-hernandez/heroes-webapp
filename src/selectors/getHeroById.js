import {heroes} from '../data/heroes';

// the default value will be an empty string, this will avoid undefined
// or null values and, if you check in the Hero component, we use this on
// our advantage to trigger additional actions in case the string is
// empty
export const getHeroById = (id = '') => {

    return heroes.find(hero => hero.id === id); 

}