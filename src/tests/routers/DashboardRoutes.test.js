import { mount } from 'enzyme';
import { MemoryRouter} from 'react-router-dom';
import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { AuthContext } from "../../auth/authContext";


describe('tests on DashboardRoutes component', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Alice'
        }
    }

    test('should render properly', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>);

            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('.text-info').text().trim()).toBe('Alice');
    })
    
})