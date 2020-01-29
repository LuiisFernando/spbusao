import React, { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native'
import { useDispatch } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/actions';

import { Container, AuthText, WaitText } from './styles';

export default function Auth({ navigation }) {
    const dispatch = useDispatch();


    async function loginSPTRANS() {
        await dispatch(signInRequest('7d32aa212c6ae41c34f6035f53a3a2bf8ab72a8063dbdd1d7e1f1eb3e02ad093'));
        //navigation.navigate('Main');
    }

    useEffect(() => {
        loginSPTRANS();
    }, []);

    return (
        <Container>
            <WaitText>Aguarde!</WaitText>
            <TouchableOpacity onPress={() => navigation.navigate('App')}>
                <AuthText>A aplicação está sendo autenticada pela sp trans.</AuthText>
            </TouchableOpacity>
        </Container>
    );
}