import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createStore} from 'redux'
import SwitchNavigator from './src/navigation/SwitchNavigator.js'
import {Provider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import rootReducer from './src/reducer/index'

const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      
       <Provider store={store}>
        <NavigationContainer>
          <SwitchNavigator/>
        </NavigationContainer>
       </Provider>
   
    )
  }
}
