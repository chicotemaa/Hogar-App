import React, { useState } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

export const Picker = ({
  title,
  items,
  handleValue,
}: {
  title: string;
  items: any;
  handleValue: (value) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [listTitle, setTitle] = useState(title);

  const handlePress = item => {
    console.log(item);
    setTitle(item.nombre);
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
              title={item.nombre}
              onPress={() => handlePress(item)}
            />
          );
        })}
      </List.Accordion>
    </View>
  );
};
