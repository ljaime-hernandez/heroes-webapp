import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../components/search/SearchScreen'; 

/* to run this test:
1. run the 'npm install' command from the heroes-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
7. run the command 'npm run test'
8. to have a clearer view of this single js test file, press p. then type the file name 'SearchScreen.test.js'
*/

// whenever we try and render the component with the mount method, we will be receiving an error due to
// the fact that we use specialized hooks which belong to a higher end component, the mount will not know
// how the hook works, therefore we have to use the jest.mock method to create a mock of one of those hooks.
// when requiring the library, the jest.mock will pretty much give us the real function back, but that wont 
// work for us as we need to test if a function was called, but we dont need the actual functionality on it.
// as seen in the syntax below, we return the function from useNavigate and assign it to a mock function,
// have in mind we do have to put the work 'mock' into our mock function, otherwise it wont work
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Tests on SearchScreen component', () => {

    test('should render properly with default values', () => {
        
        // we wont use the default path provided by the MemoryRouter but we will give an specific
        // path in the parameter, in this case its for the search screen component
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen/>
            </MemoryRouter>)

        expect(wrapper).toMatchSnapshot();
        // wrapper looks for a class with the name 'alert-info', transforms its content into 
        // text and then trims the empty incases just in case it has, the text should match with 
        // the text we used to describe the components state
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search for hero');
    })

    test('should render properly with query parameter', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen/>
            </MemoryRouter>)

        // wrapper looks for an input, checks into its 'value' property and 
        // we make sure it matches with the path given as a query
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').prop('value')).toBe('batman');
    })
    
    test('should render alert-danger class when the query does not match any hero', () => {
        
        const q = 'pokemon';

        // testing a query which is not going to match any of the heroes is being passed as 
        // a javascript styled function in the initial entries for the MemoryRouter
        const wrapper = mount (
            <MemoryRouter initialEntries={[`/search?q=${q}`]}>
                <SearchScreen/>
            </MemoryRouter>)

        expect(wrapper).toMatchSnapshot();
        // wrapper looks for a class with the name 'alert-danger', transforms its content into 
        // text and then trims the empty incases just in case it has, the text should match with 
        // the text we used to describe the components state
        expect(wrapper.find('.alert-danger').text().trim()).toBe(`No results for: ${q}`);
    })

    test('should call navigate function to render new path', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen/>
            </MemoryRouter>);

        // on the input element from this component, we assign its name to be the value of the
        // useForm hook, this will be use afterwards as a string concatenated to the actual
        // search screen component path to make a query
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'superman'
            }});

            wrapper.find('form').prop('onSubmit')({
                preventDefault(){}
            })
            // with our mockNavigate function, we are assuring the parameter used to call it is
            // the concatenation of a query string along with the input value
            expect(mockNavigate).toHaveBeenCalledWith('?q=superman');
    })
})