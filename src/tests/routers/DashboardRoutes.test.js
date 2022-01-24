import { mount } from 'enzyme';
import { MemoryRouter} from 'react-router-dom';
import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { AuthContext } from "../../auth/authContext";

/* to run this test:
1. run the 'npm install' command from the heroes-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
7. run the command 'npm run test'
8. to have a clearer view of this single js test file, press p. then type the file name 'DashboardRoutes.test.js'
*/

describe('tests on DashboardRoutes component', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Alice'
        }
    }

    test('should render MarvelScreen by default properly', () => {
        
        // if we were to try and use either the shallow or the mount methods with this component to compare it
        // with a snapshot, then it would not allow us to do so, first because we have not sent a parameter
        // for the context, which can be fixed by adding the AuthContext component as shown below, and it would also
        // send us an error related to the useNavigate hook because it requires a route context for it to work and 
        // the DashboardRoutes contains routes but it is inside a router itself, so we can use a component called
        // MemoryRouter from the react-router-dom, used specially to do unit testings.
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                     {/* higher-order component, means it contains components on it to create a context
                        required for some components to work, as explained above*/}
                <MemoryRouter>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>);

            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('.text-info').text().trim()).toBe('Alice');
    })
    
    test('should render DcScreen properly', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                     {/* different to our previous test, this one gives the MemoryRouter a parameter to pass
                      to its child components, the MemoryRouter always have a path, our home path by default
                      renders the MarvelScreen and thats how it worked on the previous test, in this one we are
                      sending our desired path and testing it against a screenshot*/}
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>);

            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('h1').text().trim()).toBe('DC Screen');
    })
    
})