import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Header } from '~/components/Header';
import { ItemOT } from '~/components/ItemOT';

export const ListadoOTScreen = ({ navigation }) => {
  return (
    <>
      <Header pageName="Ordenes de Trabajo" />
      <View style={{ flex: 8 }}>
        <ScrollView>
          <ItemOT
            estadoOT={1}
            id={3}
            titulo="Vidrio roto"
            location="Sarmiento 123"
            date="13 Agosto 2020"
            goToScreen={() => {
              navigation.navigate('DetalleOTScreen');
            }}
          />
          <ItemOT
            estadoOT={2}
            id={3}
            titulo="Vidrio roto"
            location="Sarmiento 123"
            date="13 Agosto 2021"
            goToScreen={() => {
              navigation.navigate('DetalleOTScreen');
            }}
          />
          <ItemOT
            estadoOT={4}
            id={3}
            titulo="Vidrio roto"
            location="Sarmiento 123"
            date="13 Agosto 2021"
            goToScreen={() => {
              navigation.navigate('DetalleOTScreen');
            }}
          />
        </ScrollView>
      </View>
    </>
  );
};
