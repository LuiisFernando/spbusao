import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

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
                        Parada,
                        Onibus: {
                            screen: createStackNavigator(
                                {
                                    Rotas
                                },
                                {
                                    defaultNavigationOptions: {
                                        headerTransparent: true,
                                        headerTintColor: '#000',
                                        headerLeftContainerStyle: {
                                          marginLeft: 20,
                                        },
                                      }
                                }
                            )
                        }
                    },
                    {
                        initialRouteName: 'Main',
                        resetOnBlur: true,
                        tabBarOptions: {
                            showLabel: false,
                            keyboardHidesTabBar: true,
                            activeTintColor: '#000',
                            inactiveTintColor: '#999',
                            style: {
                                height: 50
                            }
                        }
                    }
                )
            },
            {
                initialRouteName: 'Sign'
            }
        )
);