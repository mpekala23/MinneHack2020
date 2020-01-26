import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../views/login.js';
import BillsScreen from '../views/bills.js';

const stack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Bills: {
            screen: BillsScreen,
        },
    },
    {
        initialRouteName: 'Login',
    }
);

export default createAppContainer(stack);
