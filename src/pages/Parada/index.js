import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'

import Icon from 'react-native-vector-icons/MaterialIcons';

import Map from '../../components/Map';

import api from '../../services/api';

export default function Parada() {
    const [paradas, setParadas] = useState([]);

    async function loadParada() {
        const response = await api.get("/Parada/Buscar?termosBusca=");

        setParadas(response.data)
    }

    useEffect(() => {
        loadParada();
    }, []);


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
                    longitudeDelta: 0.04
                }}
            >
                {paradas.map(parada => (
                    <Marker key={parada.cp} coordinate={{ latitude: parada.py, longitude: parada.px }}>
                        <Callout>
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
        justifyContent: "center",
        alignItems: "center"
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

Parada.navigationOptions = {
    tabBarLabel: 'Parada',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="directions" size={20} color={tintColor} />
    ),
};
