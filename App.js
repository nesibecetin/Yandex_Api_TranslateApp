import Sign_in from'./src/sign_in/sign_in.js';
import Sign_up from'./src/sign_up/sign_up.js';
import Home_page from'./src/home_page/home_page.js';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    Sign_in: {
      screen: Sign_in,
      navigationOptions: {
        header: null,
      },
    },  
    Sign_up: {
      screen: Sign_up,
      navigationOptions: {
        header: null,
      },
    }, 
    Home: {
      screen: Home_page,
      navigationOptions: {
        headerTitle:'Whatever You Want'  ,
        headerStyle: { backgroundColor: '#103c36' },
        headerTitleStyle: { color: '#fff' },
      },
      
    },   
  },
  {
    initialRouteName: 'Sign_in',
  },
);
export default createAppContainer(AppNavigator);