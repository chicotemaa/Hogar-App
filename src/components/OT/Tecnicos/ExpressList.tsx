import React from 'react';

import { View, StyleSheet } from 'react-native';
import { getExpressList } from '~/services/tecnicosServices';
import { useQuery } from 'react-query';
import { ItemList } from './Express/ItemList';
import { FAB } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export const ExpressList = () => {
  const { data } = useQuery('ExpressList', getExpressList);

  console.log('info query', data);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {data &&
          data.map(formularioExpress => {
            return (
              <ItemList
                key={formularioExpress.id}
                formulario={formularioExpress}
              />
            );
          })}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="cart"
        label="Comprar Materiales"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#0BB07A',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
