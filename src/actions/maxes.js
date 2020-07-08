import {API,graphqlOperation} from 'aws-amplify'
import {createMaxes,updateMaxes} from '../graphql/mutations'
import {getMaxes} from '../graphql/queries'

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
export const updateEmail = (value) => {
    return {type:'UPDATE_EMAIL',payload:value}
}

export const getUser = (uid) => {
    return async (dispatch,getState) => {
      try {
        const user = await db.collection('users').doc(uid).get()
        dispatch( {type:'LOGIN',payload:user.data()})
        dispatch( {type:'SET_THEME',payload:theme[0]})
        dispatch( {type:'SET_MODE',payload:0})
      } catch(e){
        alert(e)
      }
    }
  }
export const fetchMaxes = (email)=>{
    return async () => {
        try{
            const maxes = await API.graphql(graphqlOperation(getMaxes,{id:email}))
            console.log('fetched maxes:',maxes)
          }
          catch{
            console.log('error getting tariqs maxes maybe to weak?')
          }
    }  
  }
  export const changeMaxes= ()=> {
    return async () => {
        const weakerguy = {
            id:"tariqu@gmail.com",
            squat:"2200",
          }
          try {
            await API.graphql(graphqlOperation(updateMaxes,{input:weakerguy}))
            console.log('updated')
           } catch(err){
            console.log('error updateing tariqs maxes')
          }
    }
}

