import React from 'react';
import {View, Text, Button} from 'react-native';
import {Header} from '../components/Header';
import {ItemOT} from '../components/ItemOT';

export const ListadoOTScreen = () => {
  return (
    <>
      <Header pageName="Ordenes de Trabajo" />
      <View style={{flex: 8}}>
        <ItemOT />
        <ItemOT />
        <ItemOT />
      </View>
    </>
  );
};
