import React, { useEffect } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Header } from '~/components/Header';
import { ItemOT } from '~/components/ItemOT';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { getOtByUser } from '~/services/tecnicosServices';

export const ListadoOTScreen = () => {
  const { data, isFetching } = useQuery('getOtByUser', getOtByUser);

  const verDetalleHandler = id => {
    console.log(id);
  };
  const navigation = useNavigation();

  return (
    <>
      <Header pageName="Ordenes de Trabajo" />
      <View style={{ flex: 8 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <ItemOT
                OT={item}
                titulo={item.formulario.titulo}
                goToScreen={() => verDetalleHandler(item)}
              />
            );
          }}
        />
      </View>
    </>
  );
};
