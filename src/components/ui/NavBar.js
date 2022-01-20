import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const Navbar = () => {

    // we use the useNavigate method from the react-router-dom library to assign its content on a 
    // constant which we will later use for a click event
    const navigate = useNavigate();

    const handleLogout = () => {

        // once the button is clicked, we will send the user to the login page, rendering its contents.
        // the 'replace: true' is used so if the user tries to return to the previous page, he is unable
        // to do so, we do this so once the user is logged out, he cannot come back until he login again,
        // not very specific on this example but conditionally makes sense on a session context
        navigate('/login', {
            replace: true,
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Comics
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    {/*the condition on the NavLink component will check if the url where the user is
                       located is the same as the element being rendered on the NavBar, if it is then the
                       class will highlight the text contained, letting the user know which comic publisher
                       he is checking now */}
                    <NavLink 
                        className={({isActive}) => "nav-item nav-link" + (isActive ? ' active' : '')} 
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>
                    {/*the condition on the NavLink component will check if the url where the user is
                       located is the same as the element being rendered on the NavBar, if it is then the
                       class will highlight the text contained, letting the user know which comic publisher
                       he is checking now */}               
                    <NavLink 
                        className={({isActive}) => "nav-item nav-link" + (isActive ? ' active' : '')} 
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    {/*the condition on the NavLink component will check if the url where the user is
                       located is the same as the element being rendered on the NavBar, if it is then the
                       class will highlight the text contained, letting the user know which comic publisher
                       he is checking now */}  
                    <NavLink 
                        className={({isActive}) => "nav-item nav-link" + (isActive ? ' active' : '')} 
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span
                        className='nav-item nav-link text-info'
                    >
                        Miguel
                    </span>

                    <button 
                        className="nav-item nav-link btn" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}