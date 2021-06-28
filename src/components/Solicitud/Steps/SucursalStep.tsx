import React from 'react';
import {Text, View} from 'react-native';
import {windowHeight} from '../../../../App';

export const SucursalStep = () => {
  return (
    <View
      style={{
        backgroundColor: '#A8A8A8',
        height: windowHeight * 0.5,
        elevation: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <Text>Elija sucursal</Text>
    </View>
  );
};
