import React, {useEffect, useState, useCallback} from 'react';
import {Text, TouchableOpacity, Button} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {Container, Title} from './styles';

export default function Previsao({navigation}) {
  const codigo = navigation.getParam('id');
  const [parada, setParada] = useState();

  useEffect(() => {
    async function loadPrevisao() {
      const response = await api.get(`/Previsao/Parada?codigoParada=${codigo}`);

      if (response.data.p) {
        setParada(response.data);
      }
      console.log(response.data);
    }
    loadPrevisao();
  }, [codigo]);

  return (
    <Container>{parada ? <Title>{parada.p.np}</Title> : <Text />}</Container>
  );
}

Previsao.navigationOptions = ({navigation}) => ({
  title: 'Previsão',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Parada');
      }}>
      <Icon name="chevron-left" size={50} color="#000" />
    </TouchableOpacity>
  ),
});
