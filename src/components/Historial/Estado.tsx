import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  estado: 'Pendiente' | 'En Revisión';
}
export const Estado = ({estado}: Props) => {
  const color = estado === 'Pendiente' ? 'red' : 'orange';
  return (
    <View>
      <Text style={{fontWeight: 'bold', padding: 0}}></Text>
      <View>
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          <IconoEstado color={color} />
          <Text
            style={{marginLeft: 2, color: color, fontSize: 20, paddingLeft: 1}}>
            {estado}
          </Text>
        </View>
      </View>
    </View>
  );
};

interface PropsIcono {
  color: 'red' | 'orange';
}
const IconoEstado = ({color}: PropsIcono) => {
  return (
    <View
      style={[
        {
          width: 10,
          height: 10,
          margin: 3,
          alignSelf: 'center',
          borderRadius: 50,
        },
        {backgroundColor: color},
      ]}></View>
  );
};
