import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Title, Paragrafro} from './styles';

export default function Profile() {
  return (
    <Container>
      <Title>SPBUSÃO</Title>
      <Paragrafro>
        SPBUSÃO é um app para rastrear e consultar informações em tempo real dos
        ônibus da cidade de São Paulo.
      </Paragrafro>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="person" size={30} color={tintColor} />
  ),
};
