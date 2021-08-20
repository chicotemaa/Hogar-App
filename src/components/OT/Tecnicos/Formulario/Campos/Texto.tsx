import React, { useContext } from 'react';
import { TextInput, View } from 'react-native';
import { ModuloContext } from '~/context/modulo/ModuloContext';
import { PropiedadItem } from '~/api/types';

interface Props {
  propiedadItem: PropiedadItem;
}

export const Texto = ({ propiedadItem }: Props) => {
  const { getResultado, setResultado } = useContext(ModuloContext);

  const value = getResultado(propiedadItem.id)?.valor ?? [''];

  const handleValueChange = (changedValue: string) => {
    setResultado(propiedadItem, {
      valor: [changedValue],
    });
  };

  return (
    <View>
      <TextInput
        style={{ backgroundColor: '#FFFFFF', padding: 10 }}
        onChangeText={handleValueChange}
        placeholder=""
        value={value[0]}
      />
    </View>
  );
};
