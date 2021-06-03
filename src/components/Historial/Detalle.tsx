import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export const Detalle = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => {}}>
        <Text
          style={{
            color: 'red',
            fontSize: 19,
            fontWeight: 'bold',
            alignSelf: 'flex-end',
          }}>
          Ver detalle
        </Text>
      </TouchableOpacity>
    </View>
  );
};
