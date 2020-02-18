import React from 'react';
import { View, Text } from 'react-native';

import api from '../../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Profile() {

    return (
        <View>
            <Text>PROFILE</Text>
        </View>
    );
}

Profile.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={30} color={tintColor} />
    ),
};