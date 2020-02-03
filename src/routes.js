import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Auth from './pages/Auth';
import Main from './pages/Main';
import Rotas from './pages/Rotas';
import Parada from './pages/Parada';
import Previsao from './pages/Previsao';

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
                                    Rotas,
                                    Previsao
                                },
                                {
                                    defaultNavigationOptions: {
                                        headerTransparent: true,
                                        headerTintColor: '#000',
                                      },
                                }
                            ),
                            navigationOptions: {
                                tabBarVisible: false
                            }
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
                initialRouteName: isSigned ? 'App' : 'Sign'
            }
        )
);