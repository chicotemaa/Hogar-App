import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { otStyle } from '~/theme/appTheme';

interface PropsEstado {
  horaInicio: string;
  horaFin: string;
}

export const Estado = ({ horaInicio, horaFin }: PropsEstado) => {
  const Divisor = () => {
    return <View style={stylesOT.divisor} />;
  };

  return (
    <View style={stylesOT.card}>
      <View style={stylesOT.view}>
        <Text style={otStyle.rightText}>Estado</Text>
        <Divisor />

        <Text style={otStyle.rightText}>Inicio</Text>

        <Divisor />

        <Text style={otStyle.rightText}>Fin</Text>

        <Divisor />
        <Text style={otStyle.rightText}>Minutos Trabajados</Text>
        <Divisor />
      </View>
      <View style={stylesOT.view}>
        <Text style={otStyle.leftText}>Finalizado</Text>
        <Divisor />
        <Text style={otStyle.leftText}>{formatDate(horaInicio, 1)}</Text>
        <Divisor />
        <Text style={otStyle.leftText}>{formatDate(horaFin, 1)}</Text>
        <Divisor />
        <Text style={otStyle.leftText}>
          {minutostrabajados(horaInicio, horaFin)}
        </Text>
        <Divisor />
      </View>
    </View>
  );
};
function formatDate(date: string, position: number) {
  const d = date.split('T', 2)[position];
  if (position === 1) {
    return d.slice(0, 5);
  }
  return d;
}
function minutostrabajados(horaInicio: string | Date, horaFin: string | Date) {
  const inicio = new Date(horaInicio);
  const fin = new Date(horaFin);
  const minutosTrabajados = (fin.getTime() - inicio.getTime()) / 60000;
  return Math.round(minutosTrabajados);
}
const stylesOT = StyleSheet.create({
  view: { flex: 1 },
  card: { flexDirection: 'row', marginVertical: 20 },
  divisor: { borderWidth: 1, borderColor: '#DFDFDF', flex: 1 },
});
