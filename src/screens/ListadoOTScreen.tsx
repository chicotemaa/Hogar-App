import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from '~/components/Header';
import { ItemOT } from '~/components/ItemOT';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '~/navigator/StackNavigator';
import { OrdenTrabajo } from '~/api/types';

export const ListadoOTScreen = () => {
  const OT = {
    id: 3,
    cliente: {
      id: 4,
      razonSocial: 'Santander',
    },
    fecha: '12 agosto 2020',
    estado: 4,
    horaDesde: '2021-03-31T15:30',
    horaHasta: '2021-03-31T15:30',
  } as OrdenTrabajo;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

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
              navigation.navigate('DetalleOTScreen', { OT });
            }}
          />
        </ScrollView>
      </View>
    </>
  );
};
