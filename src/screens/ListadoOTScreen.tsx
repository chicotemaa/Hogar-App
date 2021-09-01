import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from '~/components/Header';
import { ItemOT } from '~/components/ItemOT';
import { useNavigation } from '@react-navigation/native';

export const ListadoOTScreen = () => {
  const OT = {
    id: 3,
    location: 'Sarmiento 123',
    cliente: {
      razonSocial: 'Santander',
    },
    fecha: '12 agosto 2020',
    estado: 4,
    horaDesde: '2021-03-31T15:30',
    horaHasta: '2021-03-31T15:30',
  };
  const navigation = useNavigation();

  return (
    <>
      <Header pageName="Ordenes de Trabajo" />
      <View style={{ flex: 8 }}>
        <ScrollView>
          <ItemOT
            OT={OT}
            titulo="Vidrio roto"
            goToScreen={() => {
              //TODO: pasar por params la OT correspondiente
              navigation.navigate('DetalleOTScreen');
            }}
          />
        </ScrollView>
      </View>
    </>
  );
};
