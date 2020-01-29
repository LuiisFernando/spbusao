import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Letreiro, MapContainer } from './styles';

export default function Rotas({ navigation }) {

    const onibus = navigation.getParam('item');

    return (
        <Container>
            <Letreiro></Letreiro>
        </Container>
    );
}
  

Rotas.navigationOptions = ({ navigation }) => ({
    title: 'Onibus',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="directions-fork" size={30} color={tintColor} />
      ),
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Icon name="chevron-left" size={20} color="#000" />
      </TouchableOpacity>
    ),
  });