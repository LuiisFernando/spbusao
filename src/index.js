import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

import api from './services/api';

export default function App() {


  async function Login() {
    const response = await api.post('/Login/Autenticar?token=7d32aa212c6ae41c34f6035f53a3a2bf8ab72a8063dbdd1d7e1f1eb3e02ad093');

    if (response && response.data) {
      console.log(response.data);
    }
  }

  useEffect(() => {
    Login();
  }, [])

  return <Routes />;
}
