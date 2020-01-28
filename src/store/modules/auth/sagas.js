import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native'

import { signInSuccess, signFailure } from './actions';
import api from '../../../services/api';

export function* signIn({ payload }) {
    try {
        const { key } = payload;

        const response = yield call(api.post, `/Login/Autenticar?token=${key}`);

        if (response && response.data !== true) {
            Alert.alert('ops', `ocorreu um erro ao efetuar o login`);
            return;
        }
        
        yield put(signInSuccess());

    } catch(e) {
        Alert.alert('ops', `ocorreu um erro ao efetuar o login: ${e.message}`);
        yield put(signFailure());
    }
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn)
]);