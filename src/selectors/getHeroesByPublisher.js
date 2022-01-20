import {heroes} from '../data/heroes';


export const getHeroesByPublisher = (publisher) => {

    // this simple syntax will allow us to use the object along with extra
    // methods as seen below, which simplify our actions.
    const validPublishers = ['Marvel Comics', 'DC Comics'];

    if (validPublishers.includes(publisher)){

        return heroes.filter(hero => hero.publisher === publisher); 

    } else {
        // custom error used just in case a user finds its way into the component
        // and changes the default strings places on both the marvel and the dc components
        throw new Error(`${publisher} is not a valid publisher`);
    }
}