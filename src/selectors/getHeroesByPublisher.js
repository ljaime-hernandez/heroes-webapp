import {heroes} from '../data/heroes';


export const getHeroesByPublisher = (publisher) => {

    const validPublishers = ['Marvel Comics', 'DC Comics'];

    if (validPublishers.includes(publisher)){

        return heroes.filter(hero => hero.publisher === publisher); 

    } else {
        throw new Error(`${publisher} is not a valid publisher`);
    }
}