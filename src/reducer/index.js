const INITIAL_MAXES = {deadlift:'0',squat:'0',bench:'0',clean:'0',snatch:'0'};
const usersDefaultState = [];

export default (state = INITIAL_MAXES, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return usersDefaultState;
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