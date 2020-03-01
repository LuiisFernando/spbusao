import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Auth from './pages/Auth';
import Main from './pages/Main';
import Rotas from './pages/Rotas';
import Parada from './pages/Parada';
import Profile from './pages/Profile';
import Previsao from './pages/Previsao';
import PrevisaoMap from './pages/Previsao/map';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          Auth,
        }),
        Menu: createBottomTabNavigator(
          {
            Main,
            Parada,
            Profile,
          },
          {
            tabBarOptions: {
              showLabel: false,
              keyboardHidesTabBar: true,
              activeTintColor: '#000',
              inactiveTintColor: '#999',
              style: {
                height: 50,
              },
            },
          }
        ),
        Prev: createStackNavigator({
          Previsao: {
            screen: Previsao,
            navigationOptions: {
              headerTransparent: true,
              headerTintColor: '#000',
            },
          },
          PrevisaoMap: {
            screen: PrevisaoMap,
            navigationOptions: {
              headerTransparent: true,
              headerTintColor: '#000',
              // safeAreaInsets: {top: 'always'},
            },
          },
        }),
        Routes: createStackNavigator({
          Rotas: {
            screen: Rotas,
            navigationOptions: {
              headerTransparent: true,
              headerTintColor: '#000',
            },
          },
        }),
      },
      {
        initialRouteName: isSigned ? 'Menu' : 'Sign',
      }
    )
  );
