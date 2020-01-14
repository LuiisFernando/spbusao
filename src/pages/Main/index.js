import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Main() {
    return (
        <View>
            <Text>Main</Text>
        </View>
    );
}

Main.navigationOptions = {
    tabBarLabel: 'Main',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="event" size={20} color={tintColor} />
    ),
};