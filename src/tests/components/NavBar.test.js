import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { Navbar } from '../../components/ui/NavBar';
import { types } from '../../types/types';

/* to run this test:
1. run the 'npm install' command from the heroes-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
7. run the command 'npm run test'
8. to have a clearer view of this single js test file, press p. then type the file name 'Navbar.test.js'
*/

let dispatch = jest.fn();
let mockNavigate = jest.fn();
// same as with the SearchScreen component, if we dont create a navigate mock function then the mount 
// method would give us an error. As the dispatch belongs to our custom reducer, we dont get errors
// when trying to render it, but we still need to create a mock from it as the functionality is not
// scripted in this component, but its just a function passed as a parameter along with the user from the
// context.
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('tests on NavBar component', () => {


    test('should render properly', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'Pedro'
            }}
            
        // we need both the user context and the router context for us to render the 
        // NavBar component, so both our higher-order components need to be
        // implemented for the screenshot to work 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
            )
        
        expect(wrapper).toMatchSnapshot();
        // in a normal render for the NavBar component, we would display the user name by the
        // logout button, the element containing the user name is called text-info, so we 
        // use the find method to get it, then we retrieve its text and match it with this
        // test to confirm is working accordingly
        expect(wrapper.find('.text-info').text().trim()).toBe('Pedro');
    })

    test('should call handle logout function, use navigate and dispatch', () => {
        
        const contextValue = {
            dispatch,
            user: {
                logged: true,
                name: 'Pedro'
            }}
            
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
            )

            // we can use both a simulate or a prop method to call on the click event,
            // in here i do the prop method just to variate, the parentheses at the end of 
            // the method is for it to call the function inside its property
            wrapper.find('button').prop('onClick')();
            // on the actual NavBar component, when the click event is called, then a
            // function called handleLogout is going to trigger a series of actions, 
            // it will first retrieve the types.logout from the types file, then pass
            // it as a parameter to the dispatch function from the user reducer.
            // We did a mock of the dispatch method as the dispatch itself is tested
            // in the authReducer tests, so we just need to confirm it was called
            // accordingly in here with the respective type
            expect(contextValue.dispatch).toHaveBeenCalledWith({'type': types.logout});
            // same as in the previous test, the navigate method is inside the handleLogout
            // function, we dont need to test the navigate functionality but we just want to
            // confirm it was called with the right parameter
            expect(mockNavigate).toHaveBeenCalledWith('/login', {replace: true});
    })
})