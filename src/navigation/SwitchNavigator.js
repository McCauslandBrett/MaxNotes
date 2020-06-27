import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import HomeScreen from "../screens/HomeScreen";
import StackNavigator from './StackNavigator';

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: StackNavigator,
    Home:HomeScreen
  },
  {
    initialRouteName: "Auth",
    
  }
);

export default createAppContainer(SwitchNavigator);
