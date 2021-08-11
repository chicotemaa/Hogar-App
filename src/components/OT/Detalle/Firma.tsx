import React from 'react';
import { Text, View } from 'react-native';

export const Firma = () => {
  const textStyle = {
    fontSize: 20,
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
  };

  return (
    <View>
      <Text style={textStyle}>Firma</Text>
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          width: '50%',
          height: 200,
          backgroundColor: 'grey',
        }}
      />
      <Text style={textStyle}>Aclaración</Text>
    </View>
  );
};
