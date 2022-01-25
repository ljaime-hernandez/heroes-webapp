import {Link} from 'react-router-dom';
import { loadImage } from '../../selectors/getHeroImages';

    // for clear usage, we destructure all the details of the hero to use them on the html elements
    // soon to be rendered, all this information comes contained from an array element by using the
    // spread operator instead of specifying each value contained on the element
export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters}) => {

        // we declare a string which we will use to retrieve the picture saved in the assets folder

    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">
               <div className="row no-gutters">

                   <div className="col-4">
                        <img 
                            src={ loadImage(`${ id }.jpg`) }
                            className="card-img"
                            alt="superhero"
                        />
                    </div>

                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>
                            {
                                (alter_ego !== characters) &&

                                <p className="text-muted">{characters}</p>
                            }
                            <p className="card-text">
                                <small className="text-muted">{first_appearance}</small>
                            </p>
                            {/*the Link component will concatenate the string along with the her id to
                               render the component according to an specific hero, for this to work 
                               we have to specify its syntax in the routers component for the hero component
                               to receive parameters */}
                            <Link to={`/hero/${id}`}>
                                More...
                            </Link>
                        </div>
                    </div>

               </div>
            </div>
        </div>
    )
}
