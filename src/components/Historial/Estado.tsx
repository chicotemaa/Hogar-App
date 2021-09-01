import React from 'react';
import { Text, View } from 'react-native';
import { SolicitudEstado, solicitudEstadoLabel } from '~/api/types';

interface Props {
  estado: SolicitudEstado;
}

const colorByEstado = {
  [SolicitudEstado.PENDIENTE]: 'red',
  [SolicitudEstado.GENERADA_OT]: 'orange',
  [SolicitudEstado.DERIVADA]: 'green',
} as const;

export const Estado = ({ estado }: Props) => {
  const color = colorByEstado[estado];
  return (
    <View
      style={{ flexDirection: 'row', marginBottom: 3, alignSelf: 'flex-end' }}>
      <IconoEstado color={color} />
      <Text
        style={{
          marginLeft: 2,
          color: color,
          fontSize: 23,
          paddingLeft: 1,
        }}>
        {solicitudEstadoLabel[estado]}
      </Text>
    </View>
  );
};

interface PropsIcono {
  color: 'red' | 'orange' | 'green';
}
const IconoEstado = ({ color }: PropsIcono) => {
  return (
    <View
      style={[
        {
          width: 13,
          height: 13,
          margin: 3,
          alignSelf: 'center',
          borderRadius: 50,
        },
        { backgroundColor: color },
      ]}
    />
  );
};
