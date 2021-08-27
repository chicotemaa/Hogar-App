import React from 'react';
import { View } from 'react-native';
import { getExpressList } from '~/services/tecnicosServices';
import { useQuery } from 'react-query';
import { ItemList } from './Express/ItemList';

export const ExpressList = () => {
  const { data } = useQuery('ExpressList', getExpressList);

  console.log('info query', data);
  return (
    <View>
      {data &&
        data.map(formularioExpress => {
          return (
            <ItemList
              key={formularioExpress.id}
              formulario={formularioExpress}
            />
          );
        })}
    </View>
  );
};
