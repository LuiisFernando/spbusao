import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Map from '../../components/Map';

import api from '../../services/api';

import mapStyle from '../../mapStyle.json';

import stop from '../../assets/parada.png';

export default function Parada({navigation}) {
  const [paradas, setParadas] = useState([]);

  async function loadParada() {
    const response = await api.get('/Parada/Buscar?termosBusca=');

    setParadas(response.data);
  }

  useEffect(() => {
    loadParada();
  }, []);

  function handleCalloutPress(codigo) {
    navigation.navigate('Previsao', {id: codigo});
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        loadingEnabled={true}
        initialRegion={{
          latitude: -23.5503486,
          longitude: -46.6346886,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}>
        {paradas.map(parada => (
          <Marker
            key={parada.cp}
            coordinate={{latitude: parada.py, longitude: parada.px}}
            image={stop}>
            <Callout onPress={() => handleCalloutPress(parada.cp)}>
              <View style={styles.callout}>
                <Text style={styles.nomeParada}>{parada.np}</Text>
                <Text style={styles.enderecoParada}>{parada.ed}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  callout: {
    width: 260,
  },
  nomeParada: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  enderecoParada: {
    marginTop: 5,
  },
  previsao: {
    marginTop: 20,
    marginBottom: 10,
    color: '#00afc9',
  },
});

Parada.navigationOptions = {
  tabBarIcon: ({tintColor, focused}) => (
    <Icon
      name={focused ? 'directions' : 'directions'}
      size={30}
      color={tintColor}
    />
  ),
};
