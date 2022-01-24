import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { HeroScreen } from '../../components/hero/Hero';


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('tests on HeroScreen component', () => {


    test('should be empty if there hero value is empty ', () => {
        

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen/>
            </MemoryRouter>
        )

        expect(wrapper).toBe(undefined);
    })
    
})