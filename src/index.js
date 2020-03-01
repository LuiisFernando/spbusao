import React from 'react';
import { StatusBar, Alert } from 'react-native';
import { Provider } from 'react-redux';

import CodePush from 'react-native-code-push';

import './config/ReactotronConfig';
import store from './store';

import App from './App';

function Index() {

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="red" />
      <App />
    </Provider>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(Index);