import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { PropiedadItem } from '~/api/types';
import { useContext } from 'react';
import { ModuloContext } from '~/context/modulo/ModuloContext';

interface Props {
  propiedadItem: PropiedadItem;
}

export const Seleccion = ({ propiedadItem }: Props) => {
  const { getResultado, setResultado } = useContext(ModuloContext);

  // valor: ["12,23,54"]
  const values = (getResultado(propiedadItem.id)?.valor[0] ?? '').split(',');

  const isChecked = (id: number) => {
    return values.includes(String(id));
  };

  const handlePress = (id: number) => {
    const index = values.indexOf(String(id));
    const newValues = [...values];
    if (index >= 0) {
      newValues.splice(index, 1);
    } else {
      newValues.push(String(id));
    }
    setResultado(propiedadItem, {
      valor: [newValues.join(',')],
    });
  };

  return (
    <View>
      {propiedadItem.item.opciones.map(opcion => (
        <Checkbox.Item
          key={opcion.id}
          label={opcion.nombre}
          status={isChecked(opcion.id) ? 'checked' : 'unchecked'}
          onPress={() => {
            handlePress(opcion.id);
          }}
        />
      ))}
    </View>
  );
};
