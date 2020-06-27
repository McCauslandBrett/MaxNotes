import { createAppContainer } from 'react-navigation';
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{}}
        />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
  );
}
export default AuthStack;