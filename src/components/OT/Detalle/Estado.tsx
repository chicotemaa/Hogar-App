import React from 'react';
import {FlexStyle, Text, View} from 'react-native';

interface PropsEstado {
  horaInicio: string;
  horaFin: string;
}
export const Estado = ({horaInicio, horaFin}: PropsEstado) => {
  const right = {
    marginVertical: 5,
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 15,
  };
  const left = {
    marginVertical: 5,
    fontSize: 15,
    textAlign: 'center',
  };

  const Divisor = () => {
    return <View style={{borderWidth: 1, borderColor: '#DFDFDF', flex: 1}} />;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 20,
      }}>
      <View style={{flex: 1}}>
        <Text style={[right, {fontSize: 20}]}>Estado</Text>
        <Divisor />

        <Text style={right}>Inicio</Text>

        <Divisor />

        <Text style={right}>Fin</Text>

        <Divisor />
        <Text style={right}>Minutos Trabajados</Text>
        <Divisor />
      </View>
      <View style={{flex: 1}}>
        <Text style={[left, {fontSize: 20}]}>Finalizado</Text>
        <Divisor />
        <Text style={left}>{horaFin}</Text>
        <Divisor />
        <Text style={left}>{horaInicio}</Text>
        <Divisor />
        <Text style={left}>124</Text>
        <Divisor />
      </View>
    </View>
  );
};
