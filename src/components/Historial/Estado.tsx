import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  estado: 'Pendiente' | 'Generada OT' | 'Derivada';
}
export const Estado = ({estado}: Props) => {
  const color =
    estado === 'Pendiente'
      ? 'red'
      : estado === 'Generada OT'
      ? 'orange'
      : 'green';
  return (
    <View style={{flexDirection: 'row', marginBottom: 3, alignSelf:'flex-end'}}>
      <IconoEstado color={color} />
      <Text
        style={{          
          marginLeft: 2,
          color: color,
          fontSize: 23,
          paddingLeft: 1,
        }}>
        {estado}
      </Text>
    </View>
  );
};

interface PropsIcono {
  color: 'red' | 'orange' | 'green';
}
const IconoEstado = ({color}: PropsIcono) => {
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
        {backgroundColor: color},
      ]}></View>
  );
};
