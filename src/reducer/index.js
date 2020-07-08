const INITIAL_MAXES = {};
const INITIAL_USER ={};
const INITIAL_STATE = {};

export default (state = INITIAL_MAXES, action) => {
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
        case 'UPDATE_EMAIL':
            return {...state,email:action.payload,id:action.payload}
        default:
            return state;
    }
};