import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { LoginScreen } from '../../components/login/LoginScreen';
import { types } from '../../types/types';

/* to run this test:
1. run the 'npm install' command from the heroes-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
7. run the command 'npm run test'
8. to have a clearer view of this single js test file, press p. then type the file name 'LoginScreen.test.js'
*/

const dispatch = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('tests on LoginScreen component', () => {

    test('should render properly by default', () => {
     
        // default value on the LoginScreen component, the context should have an user
        // in logout state and should pass a dispatch function from our custom reducer,
        // in this case the dispatch will be just a mock we will use just to confirm
        // if the function was called or not and with which parameters was it called
        const contextValue = {
            dispatch,
                user: {
                    logged: false
                }
            }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <LoginScreen/>
                </AuthContext.Provider>
            </MemoryRouter>
            )

        expect(wrapper).toMatchSnapshot();
    });
    
    test('should call dispatch and navigate', () => {
        
        // we start again with a default logout user
        const contextValue = {
            dispatch,
                user: {
                    logged: false
                }
            }
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <LoginScreen/>
                </AuthContext.Provider>
            </MemoryRouter>
            )

        // we simulate the click function inside the LoginScreen component
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        // the action object we have by default inside our handleClick function
        // should change the state from logout to login in the user value from the
        // context, the dispatch would be the reducer function we use for it to change
        // its state, as the dispatch is a mock in this situation, we just have to confirm
        // the actual action object was sent as parameter accordingly
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Miguel'
            }
        });

        // the mockNavigate should be also called inside the handleClick with our default
        // parameter, which is supposed to be the marvel path by default, next we will
        // test the same function being called with the information stored in the
        // localStorage 'lastPath' item
        expect(mockNavigate).toHaveBeenCalledWith("/marvel", {"replace": true});

        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect(mockNavigate).toHaveBeenCalledWith("/dc", {"replace": true});

    });
    
})