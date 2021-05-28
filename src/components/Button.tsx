import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const Button = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => console.log('hola')}>
      <Text style={styles.text}>Iniciar Sesión</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#EC5342',
    elevation: 9,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
});
