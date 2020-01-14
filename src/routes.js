import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Main from './pages/Main';
import Rotas from './pages/Rotas';
import SignIn from './pages/SignIn';

export default createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({
                    SignIn
                }),
                App: createBottomTabNavigator(
                    {
                        Main,
                        Rotas
                    },
                    {
                        initialRouteName: 'Main',
                        resetOnBlur: true,
                        tabBarOptions: {
                            keyboardHidesTabBar: true,
                            activeTintColor: '#000',
                            inactiveTintColor: '#999',
                        }
                    }
                )
            },
            {
                initialRouteName: 'App'
            }
        )
);