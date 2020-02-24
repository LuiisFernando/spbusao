import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        loadingEnabled={true}
        initialRegion={{
          latitude: -23.5503486,
          longitude: -46.6346886,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      />
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
});
