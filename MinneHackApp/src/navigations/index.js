import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import * as React from 'react';
import { Icon } from 'react-native-elements';

import LoginScreen from '../views/login.js';
import BillsScreen from '../views/bills.js';
import SubscriptionsScreen from '../views/subscriptions.js';
import RegisterScreen from '../views/register.js';

const AppNavigator = createBottomTabNavigator(
    {
        Subscriptions: {
            screen: SubscriptionsScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="subscriptions"
                        size={40}
                        color={tintColor}
                    />
                ),
            },
        },
        Bills: {
            screen: BillsScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="folder"
                        size={40}
                        color={tintColor}
                    />
                ),
            },
        },
    },
    {
        initialRouteName: 'Bills',
        tabBarOptions: {
            activeTintColor: 'rgba(100,200,100,1)',
            inactiveTintColor: 'rgba(100,200,100,0.5)',
            style: {
                backgroundColor: 'white',
            },
            showLabel: false,
        },
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
