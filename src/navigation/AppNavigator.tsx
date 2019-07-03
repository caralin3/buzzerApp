import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from '../screens';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Buzz In'
    }
  }
});

export default createAppContainer(MainNavigator);
