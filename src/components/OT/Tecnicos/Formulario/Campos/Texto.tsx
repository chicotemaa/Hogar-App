import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

export const Texto = () => {
  const [value, setValue] = useState('');

  return (
    <View>
      <TextInput
        style={{ backgroundColor: '#FFFFFF', padding: 10 }}
        onChangeText={value => {
          setValue(...value);
          console.log(value)
        }}
        placeholder=""
      />
    </View>
  );
};
