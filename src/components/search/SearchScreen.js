import React from 'react';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

    const [{searchText}, handleInputChange, reset] =  useForm({
        searchText: ''
    })

    const heroesBySearch = getHeroesByName('');

    const handleSearch = (e) => {
        e.preventDefault();

        if(searchText.trim().length <= 1){
            return;
        }

        console.log(searchText);

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
