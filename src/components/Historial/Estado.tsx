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
    <View>
      <Text style={{fontWeight: 'bold', padding: 0}}></Text>
      <View>
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          <IconoEstado color={color} />
          <Text
            style={{marginLeft: 2, color: color, fontSize: 23, paddingLeft: 1}}>
            {estado}
          </Text>
        </View>
      </View>
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
