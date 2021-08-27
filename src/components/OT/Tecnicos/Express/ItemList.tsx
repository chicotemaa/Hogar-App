import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { windowHeight } from '~/dimensions';
import { Formulario } from '~/api/types';
import { Button } from 'react-native-paper';

interface Props {
  formulario: Formulario;
}

export const ItemList = ({ formulario }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formulario.titulo}</Text>
      <View style={styles.divisor} />
      <Button style={styles.button} onPress={() => {}}>
        Realizar
      </Button>
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
  },
});
