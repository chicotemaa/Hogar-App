import React from 'react';
import { Text, View } from 'react-native';

export const ServicioStep = () => {
  const servicios = [
    'Electricidad',
    'Plomeria',
    'Carpinteria',
    'Aires Acondicionados',
  ];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <ButtonServicio />
      <ButtonServicio />
      <ButtonServicio />
      <ButtonServicio />
    </View>
  );
};

const ButtonServicio = () => {
  return (
    <View style={{ borderWidth: 1, padding: 10 }}>
      <Text>Servicio</Text>
    </View>
  );
};
