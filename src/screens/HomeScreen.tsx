import React, {useEffect, useState} from 'react';

import {DrawerScreenProps} from '@react-navigation/drawer';
import {Text, View, Button, Image} from 'react-native';
import { getImage, getData, deleteItem } from '../api/api';

interface Props extends DrawerScreenProps<any, any> {}

export const HomeScreen = ({navigation}: Props) => {
  useEffect(() => {
    deleteItem('access_token')
    navigation.setOptions({
      
      headerRight: () => (
        <Button
          title="Menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      ),
    });
  }, []);

  return (
    <View>
      <Text>Pantalla Inicio</Text>
      <Button
        title="Menu"
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    </View>
  );
};
