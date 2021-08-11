import React, { useState } from 'react';
import { List } from 'react-native-paper';

export const Desplegable = ({ item }) => {
  const [expanded, setExpanded] = useState(true);
  const [value, setValue] = useState(0); //TODO: seleccionar un valor inicial adecuado

  const handlePress = () => setExpanded(!expanded);
  const handleSelected = (id: number) => {
    handlePress();
    setValue(id);
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
