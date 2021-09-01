import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { windowHeight, windowWidth } from '~/dimensions';
import { BaseCampo } from '../../Campos/BaseCampo';
import { PropiedadModulo } from '~/api/types';

interface Props {
  modulo: PropiedadModulo;
}

export const Modulo = ({ modulo }: Props) => {
  return (
    <View>
      <View>
        <View style={{ marginTop: 0.03 * windowHeight }}>
          <Text style={styles.title}>{modulo.modulo.titulo}</Text>
        </View>
        {modulo.equipo ? (
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.equipo, { fontWeight: 'bold' }]}>
              Equipo asignado:{' '}
            </Text>
            <Text style={styles.equipo}>
              {modulo.equipo.codigo} | {modulo.equipo.descripcion}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.container}>
        {modulo.modulo.propiedadItems.map(item => {
          return <BaseCampo key={item.id} propiedadItem={item} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0.02 * windowHeight,
  },
  title: {
    fontSize: 0.025 * windowHeight,
    fontWeight: 'bold',
  },
  equipo: {
    fontSize: 0.02 * windowHeight,
    marginTop: 0.01 * windowHeight,
    color: '#d4732d',
  },
  page: {
    paddingHorizontal: 0.005 * windowWidth,
  },
});
