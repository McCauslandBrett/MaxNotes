import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
const StackNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Signup:SignupScreen
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(StackNavigator);
