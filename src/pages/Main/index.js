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
    Onibus,
    OnibusContainer,
    HeaderImage,
    SearchForm,
    SearchTextInput,
    SearchButton,
    WrapLetreiro,
    Letreiro,
    OrigemDestino
} from './styles';

export default function Main({ navigation }) {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState('');
    const [onibus, setOnibus] = useState([]);
    const [onibusFiltered, setOnibusFiltered] = useState([]);


    async function loadOnibus() {
        try {
            await dispatch(signInRequest('7d32aa212c6ae41c34f6035f53a3a2bf8ab72a8063dbdd1d7e1f1eb3e02ad093'));

            const response = await api.get('/Posicao');

            const tOnibus = response.data.l.map((onibus, index) => {
                return {
                    id: index,
                    codigo: onibus.cl,
                    letreiro: onibus.c,
                    letreiroOrigem: onibus.lt0,
                    letreiroDestino: onibus.lt1,
                    quantidade: onibus.qv
                };
            });

            const onibusSanitezed = tOnibus.filter((onibus, index) => {
                return index === tOnibus.findIndex(obj => { return obj.letreiro === onibus.letreiro });
            });

            setOnibus(onibusSanitezed);
            setOnibusFiltered(onibusSanitezed);

        } catch (e) {
            Alert.alert(e.message);
        }
    }

    function filterOnibus() {
        if (filter) {
            const teste = onibus.filter(x => x.letreiro.includes(filter.toUpperCase()));
            setOnibusFiltered(teste);
        } else {
            setOnibusFiltered(onibus);
        }
    }

    useEffect(() => {
        loadOnibus();
    }, []);

    useEffect(() => {
        filterOnibus();
    }, [filter]);

    return (
        <Container>
            <Header>
                <HeaderImage source={header} style={{ resizeMode: 'cover' }} />
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
                <SearchButton>
                    <Icon name="my-location" size={20} color="#FFF" />
                </SearchButton>
            </SearchForm>
            {onibus && (
                <List
                    data={onibusFiltered}
                    keyExtractor={buss => String(buss.id)}
                    renderItem={({ item }) => (
                        <Onibus onPress={() => navigation.navigate('Onibus', { item })}>
                            <OnibusContainer>
                                <WrapLetreiro>
                                    <Letreiro>{item.letreiro}</Letreiro>
                                    <Icon name={`filter-${item.quantidade > 9 ? '9-plus' : item.quantidade}`} size={20} />
                                </WrapLetreiro>
                                <OrigemDestino>{item.letreiroOrigem} / {item.letreiroDestino}</OrigemDestino>
                            </OnibusContainer>
                        </Onibus>
                    )}
                />
            )}
        </Container>
    );
}

Main.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="directions-bus" size={30} color={tintColor} />
    ),
};