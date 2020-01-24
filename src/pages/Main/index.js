import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import header from '../../assets/maps2.png';

import api from '../../services/api';

import {
    Container,
    Header,
    List,
    OnibusContainer,
    HeaderImage
} from './styles';

export default function Main() {
    const [onibus, setOnibus] = useState([]);

    async function loadOnibus() {
        try {
            const response = await api.get('/Posicao');
            let i = 0;
            setOnibus(response.data.l.map((onibus, index) => {
                return {
                    id: index,
                    codigo: onibus.cl,
                    letreiro: onibus.c,
                    letreiroOrigem: onibus.lt0,
                    letreiroDestino: onibus.lt1,
                    quantidade: onibus.qv
                };
            }));

        } catch(e) {
            Alert.alert(e.message);
        }
    }

    useEffect(() => {
        loadOnibus();
    }, []);

    return (
        <Container>
            <Header>
                <HeaderImage source={header} style={{resizeMode: 'cover'}} />
            </Header>
            {onibus && (
            <List 
                data={onibus}
                keyExtractor={buss => String(buss.id)}
                renderItem={({ item }) => (
                    <OnibusContainer>
                        <Text>{item.letreiro}</Text>
                        <Text>{item.letreiroOrigem}</Text>
                        <Text>{item.letreiroDestino}</Text>
                    </OnibusContainer>
                )}
            />
            )}
        </Container>
    );
}

Main.navigationOptions = {
    tabBarLabel: 'Main',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="event" size={20} color={tintColor} />
    ),
};