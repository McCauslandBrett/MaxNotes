import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createStore} from 'redux'
import SwitchNavigator from './src/navigation/SwitchNavigator.js'
import {Provider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import rootReducer from './src/reducer/index'
import { AppLoading, DangerZone } from "expo"
import * as Font from "expo-font"
const store = createStore(rootReducer);
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config);
import { withAuthenticator } from 'aws-amplify-react-native'

class App extends Component {
  constructor(props) {
		super(props)
		this.state = {
			fontsReady: false,
		}
  }
  componentDidMount() {
		this.initProjectFonts()
  }
  
  async initProjectFonts() {
	
		await Font.loadAsync({
			"Base02": require("./assets/fonts/Base02.ttf"),
		})
		this.setState({
			fontsReady: true,
		})
	}
  render() {
    if(!this.state.fontsReady){
       return (<AppLoading />); 
    }
    return (
      
       <Provider store={store}>
        <NavigationContainer>
          <SwitchNavigator/>
        </NavigationContainer>
       </Provider>
   
    )
  }
}
export default App;
