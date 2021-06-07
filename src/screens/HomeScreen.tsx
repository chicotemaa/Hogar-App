import React, {useEffect, useState} from 'react';

import {DrawerScreenProps} from '@react-navigation/drawer';
import {Text, View, Button, Image} from 'react-native';
import {getImage, getData} from '../api/api';

interface Props extends DrawerScreenProps<any, any> {}

export const HomeScreen = ({navigation}: Props) => {
  useEffect(() => {
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
      <Text>Pantalla </Text>
    </View>
  );
};
