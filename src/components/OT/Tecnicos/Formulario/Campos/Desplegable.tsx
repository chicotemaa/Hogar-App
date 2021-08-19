import React, { useState, useContext } from 'react';
import { List } from 'react-native-paper';
import { FormContext } from '~/context/formulario/FormularioContext';
import { ModuloContext } from '~/context/modulo/ModuloContext';

export const Desplegable = ({ item }) => {
  const [expanded, setExpanded] = useState(true);
  const [value, setValue] = useState(0); //TODO: seleccionar un valor inicial adecuado

  const { getResultado, setResultado } = useContext(FormContext);
  const { modulo, moduloIndice, getIndiceItem } = useContext(ModuloContext);

  const handlePress = () => setExpanded(!expanded);
  const handleSelected = (id: any) => {
    handlePress();
    setValue(id);

    setResultado(item.id, {
      idModulo: modulo.id,
      idPropiedadItem: item.id,
      indiceItem: getIndiceItem(item.id),
      indiceModulo: moduloIndice,
      isColeccionable: false,
      latitud: '',
      longitud: '',
      valor: id,
    });

    console.log(value);
  };

  return (
    <List.Section>
      <List.Accordion
        expanded={expanded}
        onPress={handlePress}
        title={item.item.titulo}>
        {item.item.opciones.map(opcion => {
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
