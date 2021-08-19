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
    <RadioButton.Group onValueChange={handleValueChange} value={value}>
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
