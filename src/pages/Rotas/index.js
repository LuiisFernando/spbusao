import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import { getLatLngCenter } from '../../shared/CalcDistance';
import api from '../../services/api';

import { Container, Letreiro, MapContainer } from './styles';

export default function Rotas({ navigation }) {
    const onibus = navigation.getParam('item');

    const [initialPosition, setInitialPosition] = useState(null);
    const [posicoes, setPosicoes] = useState([]);


    async function loadPosicoes() {
      debugger;
      if (onibus) {
        const response = await api.get(`/Posicao/Linha?codigoLinha=${onibus.codigo}`);

        if (response && response.data && response.data.vs.length > 0) {
          const busses = response.data.vs.map(posicao => {
            return {
              prefixo: posicao.p,
              latitude: posicao.py,
              longitude: posicao.px
            }
          });
          const raio = getLatLngCenter(busses);

          setPosicoes(busses)
          setInitialPosition({
            latitude: raio[0],
            longitude: raio[1],
            latitudeDelta: 0.25,
            longitudeDelta: 0.25
          });
        }
      }
    }

    

    useEffect(() => {
      loadPosicoes();
    }, [onibus]);

    return (
        <Container>
            <Letreiro>{onibus && onibus.letreiro}</Letreiro>

            {initialPosition && (
                <View style={styles.container}>
                  <MapView
                    style={styles.map} 
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={false}
                    loadingEnabled={true}
                    initialRegion={initialPosition}
                  >
                        {posicoes.map(buss => (
                            <Marker key={buss.prefixo} coordinate={{ latitude: buss.latitude, longitude: buss.longitude }}>
                                <Callout>
                                    <View style={styles.callout}>
                                        <Text style={styles.nomeParada}>{buss.prefixo}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        ))}
                  </MapView>
                </View>
              )}
        </Container>
    );
}

const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
      height: 450,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 200
  },
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