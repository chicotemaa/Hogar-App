import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export const Numero = () => {
  const [value, setValue] = useState('');
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
