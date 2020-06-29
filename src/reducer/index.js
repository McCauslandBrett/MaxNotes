const INITIAL_MAXES = {};
const INITIAL_USER ={};
import{combineReducers} from 'redux'
const maxes = (state = INITIAL_MAXES, action) => {
    switch (action.type) {
        case 'DEAD':
            return {...state, deadlift: action.payload};
        case 'SQUAT':
             return {...state, squat:action.payload};
        case 'BENCH':
              return {...state, bench:action.payload};
        case 'CLEAN':
              return {...state, clean:action.payload};
        case 'SNATCH':
              return {...state, snatch:action.payload};
        case 'CLEAR':
              return INITIAL_MAXES;
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