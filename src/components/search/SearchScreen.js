import queryString from 'query-string';
import { useMemo } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

    // we use the useNavigate method from the react-router-dom library to assign its content on a 
    // constant which we will later use for a submit event
    const navigate = useNavigate();
    // the useLocation method will return us the URL which we are using at that very moment, helpful
    // for situations where we need to take specific information from it and retrieve arguments
    const location = useLocation();
    // the queryString library is used to separate all the arguments used on a query in a URL,
    // along with the useLocation method we can separate on strings the words or strings used on it,
    // in this case to use it as argument for a selector
    const {q = ''} = queryString.parse(location.search);
    // we use our custom hook to assign the query string value retrieved with the useLocation and
    // queryString to assign it on the form value, the handleInputChange function is used on the
    // change event to handle any modifications in the input text
    const [{searchText}, handleInputChange, reset] =  useForm({
        searchText: q
    })
    // the useMemo will allow us to keep information from the return of the getHeroesByName selector,
    // this will be highly helpful in situations where the function returns thousands of information 
    // pieces. The HeroBySearch variable will retain all the values returned by the function, this is meant
    // so in case we make another function call, if pieces of information are still the same as in the 
    // previous function call, the elements rendered will only be the new ones, adjusting to the old ones
    // but the old ones are not rendered again, saving useful memory process
    const heroesBySearch = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();

        // the navigate will concatenate a query string with the actual string used to search for an specific
        // superhero in our data files, this will trigger a series of actions described from the top of this file to the bottom
        navigate(`?q=${searchText}`);
    }


    return (
        <>
            <h1>Search</h1>
            <hr/>

            <div className='row'>
                <div className='col-5'>
                    <h4>Type hero info</h4>

                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Insert information here'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button
                            className='btn btn-outline-primary mt-2 col-12'
                            type='submit'
                        >
                            Search
                        </button>

                    </form>
                </div>
                <div className='col-7'>
                    <h4>Results</h4>
                    <hr/> 

                    {
                        // if the query string is empty, an alert box will display a message prompting us
                        // to search, if there is a string but the string does not match any of the
                        // heroes in our data files, then the string will be rendered with another alert
                        // box clearly stating theres no match with the input 
                        (q === '')
                            ? <div className='alert alert-info'>Search for hero</div>
                            : (heroesBySearch.length === 0)
                                && <div className='alert alert-danger'>No results for: {q}</div>
                    }

                    {
                        // if theres any object contained in the heroesBySearch variable then its
                        // information will be rendered by the HeroCard component, one by one using
                        // the map method. If theres no objects in the heroesBySearch variable then
                        // the page wont render any hero but will render the information contained in the
                        // condition on top of this scope
                        heroesBySearch.map( hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}    
                            />
                        ))
                    }    
                </div>
            </div>
        </>
    )
}
