import React from 'react';
import {Text, View} from 'react-native';
import {Modulo} from './Modulo';

export const Formulario = () => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <TituloFormulario />
      <Modulo />
    </View>
  );
};

const TituloFormulario = () => {
  return (
    <View style={{marginVertical: 25}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Nombre de Formulario
      </Text>
    </View>
  );
};
