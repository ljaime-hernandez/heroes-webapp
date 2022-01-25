import { useMemo } from 'react';
import {useParams, Navigate, useNavigate} from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';
import { loadImage } from '../../selectors/getHeroImages';


export const Hero = () => {

    // with the useParams method, we can retrieve the parameters which will be concatenated with a 
    // Link component located in the HeroCard component. Along with a special syntax in the router
    // for the Hero component, this method will capture an id which will be associated with one of
    // the heroes in the heroes data file
    const {heroId} = useParams();
    // we use the selector getHeroById to retrieve the data located in the heroes data file and
    // we will then use it to render the associated information in this component.
    // along with it, we use a useMemo hook, as it is a function then it should return something, 
    // in this case the return is the same getHeroById result, so we can use the value
    // into the same constant value so the webpage does not do a waste of resources doing requests 
    // for data when we already have it, the element in the brackets is the condition we put on the memo 
    // to make changes in the future, only if the heroId is changed, then we do a call for this function
    // again 
    const hero = useMemo(() => getHeroById(heroId), [heroId])

    // we use the useNavigate method from the react-router-dom library to assign its content on a 
    // constant which we will later use for a click event
    const navigate = useNavigate();

    // if the hero components is tried to be rendered with no specific hero id existing then we
    // will use the Navigate component to send the user back into the home webpage
    if(!hero){
        return <Navigate to='/'/>
    }
    
    // for clear usage, we destructure all the details of the hero to use them on the html elements
    // soon to be rendered, this step is not highly necessary but will save us time from typing
    // hero.id, hero.superhero, and so on.
    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;
    // we declare a string which we will use to retrieve the picture saved in the assets folder

    const handleReturn = () => {

        // the click event will compare the publisher with specific strings, directing the user
        // back to the 'home publisher' component
        if(publisher === 'Marvel Comics'){
            navigate('/marvel', {
                replace: false,
            });
        }else{
            navigate('/dc', {
                replace: false,
            });

            // also, we can simply use the navigate method with a -1 number, it will just return
            // the user back to the previous page, both solutions work
            // navigate(-1);
        }
    }

    return (
        // margin-top 5 
        <div className='row mt-5'>
            {/*column 4, will complete the space together with the col-8 div */}
            <div className='col-4'>
                <img 
                    src={ loadImage(`${ heroId }.jpg`) }
                    alt={hero.superhero}
                    className='img-thumbnail animate__animated animate__backInLeft'
                />
            </div>
            {/*column 8, will complete the space together with the col-4 div  */}
            <div className='col-8'>
                <h3>{superhero}</h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><b>Alter ego: </b> {alter_ego} </li>
                    <li className='list-group-item'><b>Publisher: </b> {publisher} </li>
                    <li className='list-group-item'><b>First appearance: </b> {first_appearance} </li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button
                    className='btn - btn-outline-info'
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
