import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { windowHeight, windowWidth } from '~/dimensions';
import { Formulario } from '~/api/types';

interface Props {
  formulario: Formulario;
  expressHandler: () => void;
}

export const ItemList = ({ formulario, expressHandler }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formulario.titulo}</Text>
      <View style={styles.divisor} />
      <TouchableOpacity onPress={expressHandler} style={styles.button}>
        <Text style={styles.textButton}>Realizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#c5cbe3',
    padding: 5,
    backgroundColor: '#FCFCFC',
    borderRadius: 4,
    marginHorizontal: 8,
    marginVertical: 10,
    elevation: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    color: '#4F4F4F',
    marginTop: 5,
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 0.035 * windowHeight,
    textTransform: 'capitalize',
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 8,
    width: 0.35 * windowWidth,
    backgroundColor: '#345191',
    elevation: 10,
    paddingVertical: 9,
    marginTop: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'center',
  },
});
