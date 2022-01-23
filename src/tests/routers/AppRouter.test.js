import { AppRouter } from "../../routers/AppRouter";
import { mount } from 'enzyme';
import { AuthContext } from "../../auth/authContext";

/* to run this test:
1. run the 'npm install' command from the heroes-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
7. run the command 'npm run test'
8. to have a clearer view of this single js test file, press p. then type the file name 'AppRouter.test.js'
*/

describe('tests on AppRouter component', () => {

    
    test('should render LoginScreen when user is not authenticated', () => {
        
        // this constant is going to represent the parameter shared as context with
        // the AuthContext.Provider retrieved from the reducer as an initial state, 
        // for more information please check the HeroesWebApp component
        const contextValue = {
            user: {
                logged: false
            }}
        // we use the mount method as the shallow method from enzyme would not return
        // all the contents on this component, but it would just return the name of the
        // component itself without much information for us to evaluate. For us to render
        // the AppRouter we need to send a context, same style as we did on the HeroesWebApp
        // component
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
            )

            expect(wrapper).toMatchSnapshot();
            // just as an additional test, we are retrieving the text from the LoginScreen component
            // and using the find method, along with the text and trim, to make the match with the
            // text we already know we would find in that header element. As an additional note,
            // we should remember the toBe method can only compare primitive types, it wont compare
            // classes or values which are not primitive.
            expect(wrapper.find('h1').text().trim()).toBe('Login Screen');
    })
    
    test('should render Marvel component if the user is authenticated', () => {

        // this constant is going to represent the parameter shared as context with
        // the AuthContext.Provider retrieved from the reducer as an initial state, 
        // for more information please check the HeroesWebApp component
        const contextValue = {
            user: {
                logged: true,
                name: 'Alice'
            }}
            
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
            )

            expect(wrapper).toMatchSnapshot();
            // same as in the top test, we are confirming a proper component
            // rendering by just doing a class search, in this case the navbar, 
            // and returning a boolean state which will be compared with the 
            // toBeTruthy method
            expect(wrapper.find('.navbar').exists).toBeTruthy();
    })
})