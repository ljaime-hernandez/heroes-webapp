import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Hero } from '../../components/hero/Hero';

/* to run this test:
1. run the 'npm install' command from the heroes-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
7. run the command 'npm run test'
8. to have a clearer view of this single js test file, press p. then type the file name 'HeroScreen.test.js'
*/

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('tests on HeroScreen component', () => {

    test('should be empty if there hero value is empty', () => {
        
        // we sent a path to the MemoryRouter which should have any her id as its 
        // parameter, in this scenario we are making sure the component does not 
        // render anything as the id parameter does not exist, the actual '/' page
        // should lead us to the MarvelScreen component, but we can simplify
        // things by just sending an h1 element with some text
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<Hero/>}/>
                    <Route path="/" element={<h1>No Hero Page</h1>}/>
                </Routes>
            </MemoryRouter>
        )
        
        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
    });

    test('should render hero by id', () => {
        
        // in this test the path does have a hero id in the hero component parameter,
        // the syntax for it to be rendered on the path should be :heroId, as thats the
        // way i scripted in the DashboardRoutes component, again we create a simple
        // element for the '/' path which should not be returned on this scenario as the
        // paths are properly placed now
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<Hero/>}/>
                    <Route path="/" element={<h1>No Hero Page</h1>}/>
                </Routes>
            </MemoryRouter>
        )

        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('should return to previous page', () => {
        
        // the Hero component contains a button to return to its previous
        // path, as the hero id belongs to the Marvel publisher, it should
        // return the user to the Marvel component, if the hero id was from
        // DC Comics then the DcScreen component should be the one being rendered
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<Hero/>}/>
                    <Route path="/" element={<h1>No Hero Page</h1>}/>
                </Routes>
            </MemoryRouter>
        )
        
        // the navigate hook should be the one allowing the used to come one page back
        // from its path, we dont need to test if the navigate works or not, but we need to
        // test if the parameter sent to it is the correct one
        wrapper.find('button').prop('onClick')();
        expect(mockNavigate).toHaveBeenCalledWith('/marvel', {
            replace: false,
        });
    });
    
    test('should not render hero with incorrect id', () => {
        
        // in this test im sending an inexistent hero id as parameter
        // in the Hero path, so this test is just going to check for one
        // of the elements classes to check if it does exists or not
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-batman']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<Hero/>}/>
                    <Route path="/" element={<h1>No Hero Page</h1>}/>
                </Routes>
            </MemoryRouter>
        )

        expect(wrapper.find('.row').exists()).toBe(false);
    });
})