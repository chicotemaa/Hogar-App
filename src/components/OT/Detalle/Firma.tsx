import React from 'react';
import { Text, View, Image } from 'react-native';
import { formulariosStyle } from '~/theme/appTheme';

export const Firma = ({
  firma,
  aclaracion,
}: {
  firma: string | undefined;
  aclaracion: string | undefined;
}) => {
  const textStyle = {
    fontSize: 20,
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
  } as const;
  const path =
    'https://sistemas.hogarmantenimiento.com/uploads/imagenes/resultado/' +
    firma;
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={textStyle}>Firma</Text>
      <View />
      <Image style={formulariosStyle.stretch} source={{ uri: path }} />
      <Text style={textStyle}>Aclaración: {aclaracion}</Text>
    </View>
  );
};
