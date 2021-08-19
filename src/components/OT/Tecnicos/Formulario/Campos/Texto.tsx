import React, { useState, useContext } from 'react';
import { TextInput, View } from 'react-native';
import { FormContext } from '~/context/formulario/FormularioContext';
import { ModuloContext } from '~/context/modulo/ModuloContext';
import { PropiedadItem } from '~/api/types';

interface Props {
  propiedadItem: PropiedadItem;
}

export const Texto = ({ propiedadItem }: Props) => {
  const { getResultado, setResultado } = useContext(FormContext);
  const { modulo, moduloIndice, getIndiceItem } = useContext(ModuloContext);

  const value = getResultado(propiedadItem.id)?.valor ?? '';
  const handleValueChange = (changedValue: string) => {
    setResultado(propiedadItem.id, {
      idModulo: modulo.id,
      idPropiedadItem: propiedadItem.id,
      indiceItem: getIndiceItem(propiedadItem.id),
      indiceModulo: moduloIndice,
      isColeccionable: false,
      latitud: '',
      longitud: '',
      valor: changedValue,
    });
  };

  return (
    <View>
      <TextInput
        style={{ backgroundColor: '#FFFFFF', padding: 10 }}
        onChangeText={handleValueChange}
        placeholder=""
        value={value}
      />
    </View>
  );
};
