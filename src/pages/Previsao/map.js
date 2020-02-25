import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHeaderHeight} from 'react-navigation-stack';

import {parseISO, formatRelative, parse} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {getLatLngCenter} from '../../shared/CalcDistance';

import busIcon from '../../assets/IconBus.png';
import stop from '../../assets/parada.png';

import {
  Title,
  OnibusContainer,
  WrapLetreiro,
  Letreiro,
  OrigemDestino,
} from './styles';

export default function PrevisaoMap({navigation}) {
  const previsao = navigation.getParam('item');
  const headerHeight = useHeaderHeight();

  const [prev, setPrev] = useState();
  const [initialPosition, setInitialPosition] = useState(null);

  useEffect(() => {
    function loadInitialPosition() {
      const positions = previsao.info.vs.map(posicoes => {
        return {
          latitude: posicoes.py,
          longitude: posicoes.px,
        };
      });
      positions.push({
        latitude: previsao.parada.latitude,
        longitude: previsao.parada.longitude,
      });

      const raio = getLatLngCenter(positions);
      setInitialPosition(raio);
    }

    setPrev(previsao);
    loadInitialPosition();
  }, [previsao]);

  return (
    <SafeAreaView style={[styles.container, {marginTop: headerHeight}]}>
      {prev && initialPosition ? (
        <>
          <Title>{prev.parada.nome}</Title>
          <View style={styles.infoContainer}>
            <OnibusContainer>
              <WrapLetreiro>
                <Letreiro>{prev.info.c}</Letreiro>
              </WrapLetreiro>
              <OrigemDestino>
                {prev.info.lt0} - {prev.info.lt1}
              </OrigemDestino>
            </OnibusContainer>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={false}
              loadingEnabled={true}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}>
              <Marker
                image={stop}
                coordinate={{
                  latitude: previsao.parada.latitude,
                  longitude: previsao.parada.longitude,
                }}>
                <Callout>
                  <View>
                    <Text>{previsao.parada.nome}</Text>
                  </View>
                </Callout>
              </Marker>
              {previsao.info.vs.map((predict, index) => (
                <Marker
                  key={index}
                  image={busIcon}
                  coordinate={{
                    latitude: predict.py,
                    longitude: predict.px,
                  }}>
                  <Callout>
                    <View>
                      <Text>{predict.t}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          </View>
        </>
      ) : (
        <Text>Nada Encontrado</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },
  mapContainer: {
    flex: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

PrevisaoMap.navigationOptions = ({navigation}) => ({
  title: 'Previsão',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Previsao');
      }}>
      <Icon name="chevron-left" size={50} color="#000" />
    </TouchableOpacity>
  ),
});
