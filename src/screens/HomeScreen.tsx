import React, {useEffect} from 'react';

import {DrawerScreenProps} from '@react-navigation/drawer';
import {Text, View, Button} from 'react-native';

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
      <Text>Pantalla inicio</Text>
    </View>
  );
};
