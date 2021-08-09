import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { windowWidth } from '../../../../../../../App';
import { OrdenTrabajo } from '../interfaces';

interface Props {
  OrdenTrabajo: OrdenTrabajo;
}

export const Encabezado = ({ OrdenTrabajo }: Props) => {
  return (
    <>
      <Text style={styles.title}>
        #{OrdenTrabajo.id} - {OrdenTrabajo.formulario.descripcion}
      </Text>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 0.04 * windowWidth,
    margin: 10,
    paddingVertical: 5,
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'auto',
  },
});
