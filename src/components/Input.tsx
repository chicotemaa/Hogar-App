import React from 'react';

import { StyleSheet, TextInput } from 'react-native';

export const Input = () => {
  return <TextInput style={styles.component} placeholder={'Input'} />;
};

const styles = StyleSheet.create({
  component: {
    padding: 5,
    margin: 5,
    borderColor: 'black',
    borderWidth: 4,
  },
});
