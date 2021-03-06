import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { windowWidth, windowHeight } from '~/dimensions';
import { OrdenTrabajo } from '../interfaces';

interface Props {
  OrdenTrabajo: OrdenTrabajo;
}

export const Encabezado = ({ OrdenTrabajo }: Props) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.id}>#{OrdenTrabajo.id}</Text>
        <Text style={styles.title}>{OrdenTrabajo.formulario.titulo}</Text>
        <Text style={styles.subtitle}>
          {OrdenTrabajo.formulario.descripcion}
        </Text>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: windowHeight * 0.03,
    marginHorizontal: 5,
  },
  id: {
    padding: 3,
    color: 'red',
    fontSize: 0.04 * windowWidth,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 0.06 * windowWidth,
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 0.04 * windowWidth,
  },
});
