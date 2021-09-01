import React from 'react';

import { View, StyleSheet } from 'react-native';
import {
  getExpressList,
  postResultadoExpress,
} from '~/services/tecnicosServices';
import { useQuery } from 'react-query';
import { ItemList } from './Express/ItemList';
import { FAB } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Formulario, FormularioResultadoExpress } from '~/api/types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '~/navigator/StackNavigator';

export const ExpressList = () => {
  const { data } = useQuery('ExpressList', getExpressList);

  const stackNavigator = useNavigation<NavigationProp<RootStackParams>>();

  const expressHandler = async (formularioExpress: Formulario) => {
    const express = await postResultadoExpress({
      formulario: formularioExpress,
    });
    realizarExpress(express.data);
  };

  const compraHandler = async () => {
    const express = await postResultadoExpress({
      idFormCompra: '/api/formularios/98',
    });
    realizarExpress(express.data);
  };

  const realizarExpress = (formularioExpress: FormularioResultadoExpress) => {
    stackNavigator.navigate('OTScreen', {
      OT: formularioExpress,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {data &&
          data.map(formularioExpress => {
            return (
              <ItemList
                key={formularioExpress.id}
                formulario={formularioExpress}
                expressHandler={() => expressHandler(formularioExpress)}
              />
            );
          })}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="cart"
        label="Comprar Materiales"
        onPress={compraHandler}
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
    bottom: 10,
  },
});
