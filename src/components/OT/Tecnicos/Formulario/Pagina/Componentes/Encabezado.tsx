import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { windowWidth, windowHeight } from '~/dimensions';
import { OrdenTrabajo } from '~/api/types';

interface Props {
  ordenTrabajo: OrdenTrabajo;
}

export const Encabezado = ({ ordenTrabajo }: Props) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.id}>#{ordenTrabajo.id}</Text>
        <Text style={styles.title}>{ordenTrabajo.formulario.titulo}</Text>
        <Text style={styles.subtitle}>
          {ordenTrabajo.formulario.descripcion}
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
