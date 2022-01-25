import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

/* to run this test:
1. run the 'npm install' command from the heroes-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
7. run the command 'npm run test'
8. to have a clearer view of this single js test file, press p. then type the file name 'PrivateRoute.test.js'
*/

// we use this jest.mock to emulate the Navigate component behavior from the react-router-dom
// library, as the Navigate is the component allowing us to return the user to the login component.
// components are functions returning html elements, so for this mock i created a simple span tag
// which contain a proper text to be tested as the correct return in one of our cases
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Exit Private Router</span>
}));

describe('tests on PrivateRoute', () => {

    // as the setItem is being used in this component, it by itself is a function, we will just 
    // test if the function is being called or not so thats why we make it a jest mock function
    Storage.prototype.setItem = jest.fn();

    test('should render component if the user is authenticated and save the path in the localStorage', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'Alice'
            }
        };

        // the PrivateRoute is a higher-order component, means it manages and delivers information from its
        // child components, we dont need to test any of the components inside of it, but we need to test if it 
        // is allowing us to access to any of them or not. In this scenario, the user passed as value in the
        // context is supposed to be logged in, the MemoryRouter is sending us to the '/' path which is in the
        // PrivateRoute
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter> 
            </AuthContext.Provider>
        );

        expect(wrapper.text().trim()).toBe('Private Component');
    })

    test('should have used the localStorage', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'Alice'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter> 
            </AuthContext.Provider>
        );

        // we use the useLocation hook in the PrivateRoute to save the actual
        // user path while its navigating in the webpage, the path should be the
        // '/' as that is the path we are using in the MemoryRouter as example,
        // whatever path we were to use in the webpage which was correct
        // should be saved on the localStorage
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
    })
    
    test('should block the component if the user is not authenticated', () => {
        
        const contextValue = {
            user: {
                logged: false,
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter> 
            </AuthContext.Provider>
        );

        // as the user state is logged out, the wrapper should have returned
        // the elements on the Navigate component, we defined the mock return
        // in the beginning of this file and this is the text inside the
        // span tag, which should be true in this scenario
        expect(wrapper.text()).toBe('Exit Private Router');
    })
})