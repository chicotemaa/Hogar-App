import React from 'react';
import {View, Text, Button} from 'react-native';
import {Header} from '../components/Header';
import {ItemOT} from '../components/ItemOT';

export const ListadoOTScreen = ({navigation}) => {
  return (
    <>
      <Header pageName="Ordenes de Trabajo" />
      <View style={{flex: 8}}>
        <ItemOT
          id="12"
          titulo="Vidrio roto"
          location="Sarmiento 123"
          date="13 Agosto"
          goToScreen={() => {
            navigation.navigate('DetalleOTScreen');
          }}
        />
        <ItemOT
          id="15"
          titulo="Vidrio roto"
          location="Sarmiento 123"
          date="13 Agosto"
          goToScreen={() => {
            navigation.navigate('DetalleOTScreen');
          }}
        />
        <ItemOT
          id="13"
          titulo="Vidrio roto"
          location="Sarmiento 123"
          date="13 Agosto"
          goToScreen={() => {
            navigation.navigate('DetalleOTScreen');
          }}
        />
      </View>
    </>
  );
};
