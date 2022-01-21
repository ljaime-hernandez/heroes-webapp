import queryString from 'query-string';
import { useMemo } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {q = ''} = queryString.parse(location.search);

    const [{searchText}, handleInputChange, reset] =  useForm({
        searchText: q
    })
    
    const heroesBySearch = useMemo(() => getHeroesByName(q), [q]);
    const handleSearch = (e) => {
        e.preventDefault();

        console.log(searchText);
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
                        (q === '')
                            ? <div className='alert alert-info'>Search for hero</div>
                            : (heroesBySearch.length === 0)
                                && <div className='alert alert-danger'>No results for: {q}</div>
                    }

                    {
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
