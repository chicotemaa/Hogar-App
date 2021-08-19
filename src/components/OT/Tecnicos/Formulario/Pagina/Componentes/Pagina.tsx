import React from 'react';
import { Text, View } from 'react-native';
import { windowHeight } from '~/dimensions';
import { PaginaModulo } from '~/api/types';
import { Modulo as ModulosItem } from './Modulo';
import { ModuloProvider } from '~/context/modulo/ModuloContext';

interface Props {
  modulos: PaginaModulo[];
}

export const Pagina = ({ modulos }: Props) => {
  return (
    <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
      <Text
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 0.022 * windowHeight,
        }}>
        {modulos[0].paginaNombre}
      </Text>
      {modulos.map((modulo, index) => {
        return (
          <ModuloProvider modulo={modulo} moduloIndice={index}>
            <ModulosItem key={modulo.id} modulo={modulo} />
          </ModuloProvider>
        );
      })}
    </View>
  );
};
