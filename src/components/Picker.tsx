import React, { useState } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

interface Item {
  nombre?: string;
  titulo?: string;
  codigo?: string;
  direccion?: string;
}

export const Picker = ({
  title,
  items,
  handleValue,
}: {
  title: string;
  items: Item[];
  handleValue: (value) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [listTitle, setTitle] = useState<undefined | string>(title);

  const handlePress = (item: Item) => {
    setTitle(
      item.nombre ||
        item.titulo ||
        (item.codigo && `${item.codigo} - ${item.direccion}`),
    );
    setExpanded(v => !v);
    handleValue(item);
  };
  //Remain item tiene que tener campo nombre
  return (
    <View>
      <List.Accordion
        title={listTitle}
        style={{ backgroundColor: 'white', borderRadius: 5 }}
        theme={{ roundness: 20 }}
        expanded={expanded}
        onPress={() => setExpanded(v => !v)}>
        {items.map((item, index) => {
          return (
            <List.Item
              key={index}
              title={
                item.nombre ||
                item.titulo ||
                (item.codigo && `${item.codigo} | ${item.direccion}`)
              }
              onPress={() => handlePress(item)}
            />
          );
        })}
      </List.Accordion>
    </View>
  );
};
