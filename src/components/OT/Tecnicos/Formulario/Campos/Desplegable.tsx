import React, { useState, useContext } from 'react';
import { List } from 'react-native-paper';
import { FormContext } from '~/context/formulario/FormularioContext';
import { ModuloContext } from '~/context/modulo/ModuloContext';
import { PropiedadItem } from '~/api/types';

interface Props {
  propiedadItem: PropiedadItem;
}

export const Desplegable = ({ propiedadItem }: Props) => {
  const [expanded, setExpanded] = useState(true);

  const { getResultado, setResultado } = useContext(ModuloContext);

  const value = getResultado(propiedadItem.id)?.valor ?? ['0'];

  const handlePress = () => setExpanded(!expanded);
  const handleSelected = (id: number) => {
    handlePress();

    setResultado(propiedadItem, {
      valor: [String(id)],
    });

    console.log(value);
  };

  return (
    <List.Section>
      <List.Accordion
        expanded={expanded}
        onPress={handlePress}
        title={propiedadItem.item.titulo}>
        {propiedadItem.item.opciones.map(opcion => {
          return (
            <List.Item
              key={opcion.id}
              onPress={() => {
                handleSelected(opcion.id);
              }}
              title={opcion.nombre}
            />
          );
        })}
      </List.Accordion>
    </List.Section>
  );
};
