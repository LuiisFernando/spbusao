import React from 'react';
import { View, Text } from 'react-native';

import api from '../../services/api';

export default function Previsao() {

    async function loadPrevisao() {
        if (onibus) {
          const response = await api.get(`/Previsao/Linha?codigoLinha=${onibus.codigo}`);
  
          if (response && response.data) {
            console.log("PREVISAAAO >>>> ", response.data)
          }
        }
      }

    return (
        <View>
            <Text>Previsao</Text>
        </View>
    );
}