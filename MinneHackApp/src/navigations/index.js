import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../views/login.js';
import BillsScreen from '../views/bills.js';
import SubscriptionsScreen from '../views/subscriptions.js';
import RegisterScreen from '../views/register.js';

const AppNavigator = createBottomTabNavigator(
    {
        Subscriptions: {
            screen: SubscriptionsScreen,
        },
        Bills: {
            screen: BillsScreen,
        },
    },
    {
        initialRouteName: 'Bills'
    }
);

const StackNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        App: {
            screen: AppNavigator,
        },
        Register: {
            screen: RegisterScreen,
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
    }
);

export default createAppContainer(StackNavigator);