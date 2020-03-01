import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Provider } from 'react-redux';

import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import './config/ReactotronConfig';
import store from './store';

import App from './App';

function Index() {

  useEffect(() => {
    OneSignal.init("c591856c-33d4-4c61-9271-f853329d6acb");


    function onReceived(data) {

    }

    function onOpened(notification) {

    }

    function onIds(id) {

    }


    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }
  }, []);

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