import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Auth from './pages/Auth';
import Main from './pages/Main';
import Rotas from './pages/Rotas';
import Parada from './pages/Parada';

export default (isSigned = false) =>
 createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({
                    Auth
                }),
                App: createBottomTabNavigator(
                    {
                        Main,
                        Rotas,
                        Parada
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
                initialRouteName: isSigned ? 'App' : 'Sign'
            }
        )
);