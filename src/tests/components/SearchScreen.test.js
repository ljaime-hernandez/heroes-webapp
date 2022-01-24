import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../components/search/SearchScreen'; 

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Tests on SearchScreen component', () => {

    test('should render properly with default values', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen/>
            </MemoryRouter>)

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search for hero');
    })

    test('should render properly with query parameter', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen/>
            </MemoryRouter>)

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').prop('value')).toBe('batman');
    })
    
    test('should render alert-danger class when the query does not match any hero', () => {
        
        const q = 'pokemon';

        const wrapper = mount (
            <MemoryRouter initialEntries={[`/search?q=${q}`]}>
                <SearchScreen/>
            </MemoryRouter>)

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-danger').text().trim()).toBe(`No results for: ${q}`);
    })

    test('should call navigate function to render new path', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen/>
            </MemoryRouter>);

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'superman'
            }});

            wrapper.find('form').prop('onSubmit')({
                preventDefault(){}
            })

            expect(mockNavigate).toHaveBeenCalledWith('?q=superman');
    })
    
    
})