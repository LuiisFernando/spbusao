import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Rotas() {
    return (
        <View>
            <Text>Rotas</Text>
        </View>
    );
}

Rotas.navigationOptions = {
    tabBarLabel: 'Rotas',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" size={20} color={tintColor} />
    ),
};
  