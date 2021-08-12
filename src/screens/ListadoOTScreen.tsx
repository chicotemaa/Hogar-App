import React from 'react';
import { View, ScrollView } from 'react-native';
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
            horaDesde="2021-03-31T15:30"
            horaHasta="2021-03-31T15:30"
            date="13 Agosto 2020"
            goToScreen={() => {
              navigation.navigate('DetalleOTScreen');
            }}
          />
        </ScrollView>
      </View>
    </>
  );
};
