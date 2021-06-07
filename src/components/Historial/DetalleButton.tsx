import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: any;
  codigo: string;
}

export const DetalleButton = ({codigo, navigation}: Props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetalleSolicitudScreen', {
            codigo,
            navigation,
          });
        }}>
        <Text
          style={{
            color: '#EC5342',
            fontSize: 21,
            fontWeight: 'bold',
            alignSelf: 'flex-end',
          }}>
          Ver detalle
        </Text>
      </TouchableOpacity>
    </View>
  );
};
