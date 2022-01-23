import {authReducer} from '../../../src/auth/authReducer';
import { types } from '../../types/types';

/* to run this test:
1. run the 'npm install' command from the heroes-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
7. run the command 'npm run test'
8. to have a clearer view of this single js test file, press p. then type the file name 'authReducer.test.js'
*/

describe('Tests on authReducer', () => {

    test('should return default state', () => {
       
       const state = authReducer({}, {logged: false});

       expect(state).toEqual({});
    });
    
    test('should login an user', () => {

        const action = {
            type: types.login,
            payload: {name: 'Alice'}
        }

        const state = authReducer({}, action);

       console.log(state);
       expect(state).toEqual({"logged": true, "name": "Alice" })
    })

    test('should logout an user', () => {

        const action = {
            type: types.logout,
        }

        const state = authReducer({}, action);

        console.log(state);
        expect(state).toEqual({logged: false})
    });
})