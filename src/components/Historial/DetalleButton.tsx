import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '~/navigator/StackNavigator';

interface Props {
  navigation: StackNavigationProp<
    RootStackParams,
    'HistorialSolicitudesScreen'
  >;
  codigo: string;
}

export const DetalleButton = ({ codigo, navigation }: Props) => {
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
            color: '#ef4920',
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
