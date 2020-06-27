const INITIAL_MAXES = {};
const INITIAL_USER ={};
import{combineReducers} from 'redux'
const maxes = (state = INITIAL_MAXES, action) => {
    switch (action.type) {
        case 'DEAD':
            return {...state, deadlift:payload};
        case 'SQUAT':
             return {...state, squat:payload};
        default:
            return state;
    }
};
const user = (state = INITIAL_USER, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state};
        case 'SIGNUP':
                return {...state};
        default:
            return state;
    }
};
const rootReducer = combineReducers({
    user,
    maxes,
   })
   
   export default rootReducer