import { useContext } from "react";
import {Navigate} from 'react-router-dom';
import { AuthContext } from "../auth/authContext";

export const PublicRoute = ({children}) => {

    // we use the context to retrieve the user values kept on the localStorage, if any.
    // By default, the logged property should be false, as stated in the init function
    // located in the HeroesWebApp component
    const {user} = useContext(AuthContext);  

    // compared to the PrivateRoute component, we change the position of the children 
    // return, and we change the Navigate path to the marvel component, instead of the
    // login one.
    return user.logged
        ?  <Navigate to="/marvel"/>       
        :  children
}