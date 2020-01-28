import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import store from './store';

import App from './App';

export default function Index() {

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#FFF" />
      <App />
    </Provider>
  );
}
