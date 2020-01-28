import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import header from '../../assets/maps2.png';

import api from '../../services/api';

import { signInRequest } from '../../store/modules/auth/actions';

import {
    Container,
    Header,
    List,
    OnibusContainer,
    HeaderImage,
    Letreiro,
    OrigemDestino
} from './styles';

export default function Main() {
    const dispatch = useDispatch();

    const [onibus, setOnibus] = useState([]);

    async function loadOnibus() {
        try {
            await dispatch(signInRequest('7d32aa212c6ae41c34f6035f53a3a2bf8ab72a8063dbdd1d7e1f1eb3e02ad093'));

            const response = await api.get('/Posicao');

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

            if (onibus) {
                console.log('Carregou!');
            }

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
                        <Letreiro>{item.letreiro}</Letreiro>
                        <OrigemDestino>{item.letreiroOrigem} / {item.letreiroDestino}</OrigemDestino>
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