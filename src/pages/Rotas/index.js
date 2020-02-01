import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import timer from 'react-native-timer';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { getLatLngCenter } from '../../shared/CalcDistance';

import api from '../../services/api';

import busIcon from '../../assets/IconBus.png'
import styleMap from '../../mapStyle.json';

import { Container, Letreiro, MapContainer, InformationContainer, InformationContainer2 } from './styles';

export default function Rotas({ navigation }, props) {
    const onibus = navigation.getParam('item');

    const [initialPosition, setInitialPosition] = useState(null);
    const [posicoes, setPosicoes] = useState([]);


    async function loadPosicoes() {
      if (onibus) {
        const response = await api.get(`/Posicao/Linha?codigoLinha=${onibus.codigo}`);

        if (response && response.data && response.data.vs.length > 0) {
          const busses = response.data.vs.map(posicao => {
            return {
              prefixo: posicao.p,
              acessivel: posicao.a,
              latitude: posicao.py,
              longitude: posicao.px
            }
          });

          const raio = getLatLngCenter(busses);

          setPosicoes(busses);
          setInitialPosition({
            latitude: raio[0],
            longitude: raio[1],
            latitudeDelta: 0.10,
            longitudeDelta: 0.10
          });
        }
        console.log('onibus atualizados!');
      }
    }

    useEffect(() => {
      loadPosicoes();
    }, [onibus]);

    useEffect(() => {
      // loadPosicoes();
      timer.setInterval(props, 'updatePosicao', loadPosicoes, 5000);
      return () => {
        timer.clearInterval(props, 'updatePosicao');
      }
    });

    return (
        <Container>
            <InformationContainer>
              {onibus && <Letreiro>{onibus.letreiro } - { onibus.letreiroOrigem } - {onibus.letreiroDestino}</Letreiro>}

            </InformationContainer>

            <MapContainer>
              {initialPosition && (
                    <MapView
                      style={styles.map} 
                      provider={PROVIDER_GOOGLE}
                      showsUserLocation={false}
                      loadingEnabled={true}
                      initialRegion={initialPosition}
                      customMapStyle={styleMap}
                    >
                          {posicoes.map((buss, index) => (
                              <Marker 
                                key={index}
                                coordinate={{ latitude: buss.latitude, longitude: buss.longitude }}
                                image={busIcon}
                                style={{ transform: [{
                                  rotate: '55deg'
                                 }]
                                }}
                              >
                                  <Callout>
                                      <View style={styles.callout}>
                                          <Text style={styles.nomeParada}>{buss.prefixo}</Text>
                                          {buss.acessivel && (
                                            <Icon name="accessible" size={30} color="#000" />
                                          )}
                                      </View>
                                  </Callout>
                              </Marker>
                          ))}
                    </MapView>
                )}
            </MapContainer>
        </Container>
    );
}

const styles = StyleSheet.create({
  map: {
      ...StyleSheet.absoluteFillObject,
      flex: 1
  },
  callout: {
      width: 260
  },
  nomeParada: {
      fontWeight: 'bold',
      fontSize: 16
  },
  enderecoParada: {
      marginTop: 5
  }
})
  

Rotas.navigationOptions = ({ navigation }) => ({
    title: 'Ônibus',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Icon name="chevron-left" size={20} color="#000" />
      </TouchableOpacity>
    ),
});