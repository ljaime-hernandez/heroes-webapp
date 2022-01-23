import React, { useEffect, useReducer } from 'react';
import { AppRouter } from './routers/AppRouter';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';

// in this scenario, the init function of my reducer is going to try and retrieve
// information from a saved user on the localStorage, it this condition was true then
// the return would be parsed into a JSON object, as the local storage is only able
// to save strings, else if no information is stored in the localStorage, then the 
// logged state of the webpage will be false.
const init = () => {
    // Something interesting about this condition is that, the OR '||' condition will
    // return logged: false, this will become our user value in the reducer, when 
    // checking into the local storage on the browser, we will be able to see that there
    // is information saved on it, which will be on the user portion of the local storage
    return JSON.parse(localStorage.getItem('user')) || {logged: false};
}

export const HeroesWebApp = () => {

    // the useReducer hook will take our authReducer (custom reducer) to retrieve its 
    // information and add it to the user, by default it should be an empty object, 
    // which will then trigger the init function described above
    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {

        if(!user) return;

        // we use the setItem method of the local storage and we stringify its content 
        // for the localStorage to be able to save it, as the localStorage is only 
        // capable of storing strings. the useEffect will call itself again only when any
        // changes are done to the user
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    return (
        <AuthContext.Provider value={{user, dispatch}}>
            <AppRouter/>
        </AuthContext.Provider>
    )
}
