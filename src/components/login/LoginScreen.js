import {useNavigate} from 'react-router-dom';

export const LoginScreen = () => {

    // we use the useNavigate method from the react-router-dom library to assign its content on a 
    // constant which we will later use for a click event
    const navigate = useNavigate();

    const handleLogin = () => {
        // once the button is clicked, we will send the user to the marvel page, rendering its contents.
        // the 'replace: true' is used so if the user tries to return to the previous page, he is unable
        // to do so, we do this so once the user is logged out, he cannot come back until he login again,
        // not very specific on this example but conditionally makes sense on a session context
        navigate('/marvel', {
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
