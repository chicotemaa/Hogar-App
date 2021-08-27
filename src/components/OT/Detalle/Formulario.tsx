import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Firma } from './Firma';
import { Modulo } from './Modulo';

export const Formulario = ({ OrdenTrabajo }: any) => {
  const OT = OrdenTrabajo;
  return (
    <View style={styles.TituloFormulario}>
      <TituloFormulario OrdenTrabajo={OT} />
      <Modulo />
      <Firma />
    </View>
  );
};

const TituloFormulario = ({ OrdenTrabajo }: any) => {
  const OT = OrdenTrabajo;
  return (
    <View style={styles.viewTitulo}>
      <Text style={styles.TextTitulo}>Formulario : {OT.titulo}</Text>
      <Text style={styles.TextTitulo}>Descripcion : {OT.descripcion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TituloFormulario: { paddingHorizontal: 20 },
  viewTitulo: { marginVertical: 25 },
  TextTitulo: { fontSize: 20, fontWeight: 'bold' },
});
