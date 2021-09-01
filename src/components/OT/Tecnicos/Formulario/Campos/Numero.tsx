import React from 'react';
import { TextInput } from 'react-native';

export const Numero = () => {
  return (
    <TextInput
      style={{ padding: 5, margin: 5 }}
      keyboardType="numeric"
      placeholder="Ingrese valor..."
      onChangeText={value => {
        console.log(value);
      }}
    />
  );
};
