import React, {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import header from '../../assets/maps2.png';

import api from '../../services/api';

import {
  Container,
  Header,
  List,
  Onibus,
  OnibusContainer,
  HeaderImage,
  SearchForm,
  SearchTextInput,
  WrapLetreiro,
  Letreiro,
  OrigemDestino,
} from './styles';

export default function Main({navigation}) {
  const [filter, setFilter] = useState('');
  const [onibus, setOnibus] = useState([]);
  const [onibusFiltered, setOnibusFiltered] = useState([]);

  async function loadOnibus() {
    try {
      const response = await api.get('/Posicao');

      const tOnibus = response.data.l.map((buss, index) => {
        return {
          id: index,
          codigo: buss.cl,
          letreiro: buss.c,
          letreiroOrigem: buss.lt0,
          letreiroDestino: buss.lt1,
          quantidade: buss.qv,
        };
      });

      const onibusSanitezed = tOnibus.filter((buss, index) => {
        return (
          index ===
          tOnibus.findIndex(obj => {
            return obj.letreiro === buss.letreiro;
          })
        );
      });

      setOnibus(onibusSanitezed);
      setOnibusFiltered(onibusSanitezed);
    } catch (e) {
      Alert.alert(e.message);
    }
  }

  // const filtro = useCallback(filterOnibus, []);

  useEffect(() => {
    loadOnibus();
  }, []);

  useEffect(() => {
    function filterOnibus() {
      if (filter) {
        const onibusFilter = onibus.filter(x =>
          x.letreiro.includes(filter.toUpperCase())
        );
        setOnibusFiltered(onibusFilter);
      } else {
        setOnibusFiltered(onibus);
      }
    }

    filterOnibus();
  }, [filter, onibus]);

  return (
    <Container>
      <Header>
        <HeaderImage source={header} style={{resizeMode: 'cover'}} />
      </Header>
      <SearchForm>
        <SearchTextInput
          placeholder="Digite o letreiro do ônibus"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={filter}
          onChangeText={setFilter}
        />
      </SearchForm>
      {onibus && (
        <List
          data={onibusFiltered}
          keyExtractor={buss => String(buss.id)}
          renderItem={({item}) => (
            // <Onibus onPress={() => navigation.navigate('Previsao', {item})}>
            <Onibus
              onPress={() => navigation.navigate('Previsao', {id: 670016556})}>
              <OnibusContainer>
                <WrapLetreiro>
                  <Letreiro>{item.letreiro}</Letreiro>
                  <Icon
                    name={`filter-${
                      item.quantidade > 9 ? '9-plus' : item.quantidade
                    }`}
                    size={20}
                  />
                </WrapLetreiro>
                <OrigemDestino>
                  {item.letreiroOrigem} / {item.letreiroDestino}
                </OrigemDestino>
              </OnibusContainer>
            </Onibus>
          )}
        />
      )}
    </Container>
  );
}

Main.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="directions-bus" size={30} color={tintColor} />
  ),
};
