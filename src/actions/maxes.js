export const updateSquat = (value) => {
    return {type:'SQUAT',payload:value}
}
export const updateDeadlift = (value) => {
    return {type:'DEAD',payload:value}
}
export const updateBench = (value) => {
    return {type:'BENCH',payload:value}
}
export const updateClean = (value) => {
    return {type:'CLEAN',payload:value}
}
export const updateSnatch = (value) => {
    return {type:'SNATCH',payload:value}
}
export const clear = () => {
    return {type:'CLEAR'}
}

