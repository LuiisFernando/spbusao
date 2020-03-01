import React, {useEffect, useState, useCallback} from 'react';
import {TouchableOpacity, BackHandler} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Title,
  List,
  Onibus,
  OnibusContainer,
  WrapLetreiro,
  Letreiro,
  OrigemDestino,
} from './styles';

export default function Previsao({navigation}) {
  const codigo = navigation.getParam('id');
  const [parada, setParada] = useState();

  useEffect(() => {
    function handleBackButtonPressAndroid() {
      navigation.navigate('Parada');
      return true;
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    }
  }, []);

  useEffect(() => {
    async function loadPrevisao() {
      const response = await api.get(`/Previsao/Parada?codigoParada=${codigo}`);

      if (response.data.p) {
        setParada(response.data);
      }
    }
    loadPrevisao();
  }, [codigo]);

  return (
    <Container>
      {parada ? (
        <>
          <Title>{parada.p.np}</Title>

          <List
            data={parada.p.l}
            keyExtractor={parad => String(parad.cl)}
            renderItem={({item}) => (
              <Onibus
                onPress={() =>
                  navigation.navigate('PrevisaoMap', {
                    item: {
                      info: item,
                      parada: {
                        nome: parada.p.np,
                        latitude: parada.p.py,
                        longitude: parada.p.px,
                      },
                    },
                  })
                }>
                <OnibusContainer>
                  <WrapLetreiro>
                    <Letreiro>{item.c}</Letreiro>
                    <Icon
                      name={`filter-${item.qv > 9 ? '9-plus' : item.qv}`}
                      size={20}
                    />
                  </WrapLetreiro>
                  <OrigemDestino>
                    {item.lt0} - {item.lt1}
                  </OrigemDestino>
                </OnibusContainer>
              </Onibus>
            )}
          />
        </>
      ) : (
        <Title>Onibus não encontrado</Title>
      )}
    </Container>
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
