import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { windowHeight, windowWidth } from '../../../../../../../App';
import { CampoProvider } from '../../../../../../context/campo/CampoContext';
import { BaseCampo } from '../../Campos/BaseCampo';
import { Modulo as IModulo, ModuloProps } from '../interfaces';

interface Props {
  Items: ModuloProps;
  Modulo: IModulo;
}

export const Modulo = ({ Items, Modulo }: Props) => {
  return (
    <View>
      <View>
        <View style={{ marginTop: 0.03 * windowHeight }}>
          <Text style={styles.title}>{Items.titulo}</Text>
        </View>
        {Modulo.equipo ? (
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.equipo, { fontWeight: 'bold' }]}>
              Equipo asignado:{' '}
            </Text>
            <Text style={styles.equipo}>
              {Modulo.equipo.codigo} | {Modulo.equipo.descripcion}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.container}>
        {Items.propiedadItems.map(item => {
          return (
            <CampoState>
              <BaseCampo item={item} />
            </CampoState>
          );
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

const CampoState = ({ children }: any) => {
  return <CampoProvider>{children}</CampoProvider>;
};
