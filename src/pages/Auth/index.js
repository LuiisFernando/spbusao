import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import {useDispatch} from 'react-redux';

import {signInRequest, signInSuccess} from '../../store/modules/auth/actions';

import api from '../../services/api';

import {Container, AuthText, WaitText, Button} from './styles';

export default function Auth({navigation}) {
  const dispatch = useDispatch();

  async function loginSPTRANS() {
      dispatch(
        signInRequest(
          '7d32aa212c6ae41c34f6035f53a3a2bf8ab72a8063dbdd1d7e1f1eb3e02ad093',
        ),
      );

  }

  useEffect(() => {
    loginSPTRANS();
  }, [loginSPTRANS]);

  return (
    <Container>
      <WaitText>Aguarde!</WaitText>
      <Button onPress={loginSPTRANS}>
        <AuthText>A aplicação está sendo autenticada pela sp trans.</AuthText>
      </Button>
    </Container>
  );
}
