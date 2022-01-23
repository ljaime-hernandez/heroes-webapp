import { types } from "../types/types";

// the reducer should be a pure function in a manner on which everything
// should be resolved within it, the reducer should not exit to check on
// additional functions but only to work in itself and give an outcome no
// matter what arguments it receive, in this case our default return is 
// an empty object which is a default value for the state
export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
                return {
                    ...action.payload,
                    logged: true
                }

        case types.logout:
                return {
                    logged: false
                }

        default:
            return state;
    }

}