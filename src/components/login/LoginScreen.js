import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const LoginScreen = () => {

    // we use the useNavigate method from the react-router-dom library to assign its content on a 
    // constant which we will later use for a click event
    const navigate = useNavigate();
    // we destructure the dispatch function of our context to send its arguments to our reducer
    const {dispatch} = useContext(AuthContext);

    const handleLogin = () => {

        // the login property of the types file is added to this object, along with a default
        // value which will be rendered on the navbar, the dispatch will then confirm the log
        // in, adding the values to the reducer object which will then be used by the context
        // for route handling in both the public and private components
        const action = {
            type: types.login,
            payload: {name: 'Miguel'}
        }

        dispatch(action);

        // the private route will always be updating the information of the last page visited
        // by retrieving the users location with a useLocation hook, we then retrieve it with
        // this getItem method, which, in case the user deletes or clears the cache of its browser,
        // will then assign the marvel path to this constant value by default
        const lastPath = localStorage.getItem('lastPath') || '/marvel';

        // once the button is clicked, we will send the user to the marvel page (by default, if theres a path
        // saved in the localStorage 'lastPath' item then we will use it), rendering its contents.
        // the 'replace: true' is used so if the user tries to return to the previous page, he is unable
        // to do so, we do this so once the user is logged out, he cannot come back until he login again,
        // not very specific on this example but conditionally makes sense on a session context
        navigate(lastPath, {
            replace: true,
        });
    }

    return (
        <div className='container mt-5'>
            <h1>Login Screen</h1>
            <hr/>

            <button 
                className='btn btn-primary'
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
