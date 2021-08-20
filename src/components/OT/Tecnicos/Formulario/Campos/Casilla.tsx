import * as React from 'react';
import { useContext } from 'react';
import { RadioButton } from 'react-native-paper';
import { PropiedadItem } from '~/api/types';
import { FormContext } from '~/context/formulario/FormularioContext';
import { ModuloContext } from '~/context/modulo/ModuloContext';

interface Props {
  propiedadItem: PropiedadItem;
}

export const Casilla = ({ propiedadItem }: Props) => {
  const { getResultado, setResultado } = useContext(ModuloContext);

  const value = getResultado(propiedadItem.id)?.valor ?? [''];

  const handleValueChange = (changedValue: string) => {
    setResultado(propiedadItem, {
      valor: [changedValue],
    });
  };

  return (
    <RadioButton.Group onValueChange={handleValueChange} value={value[0]}>
      {propiedadItem.item.opciones.map(opcion => (
        <RadioButton.Item
          key={opcion.id}
          label={opcion.nombre}
          value={String(opcion.id)}
        />
      ))}
    </RadioButton.Group>
  );
};
