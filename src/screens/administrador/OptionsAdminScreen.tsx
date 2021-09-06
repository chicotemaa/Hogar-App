import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '~/components/Button';
import { windowWidth } from '~/dimensions';
import { userRol } from '~/api/types';

export const OptionsAdmin = ({
  handlerOptions,
}: {
  handlerOptions: (rol: userRol) => void;
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textWelcome}>Bienvenido!</Text>
        <Text style={styles.textWelcome}>Con que rol quiere ingresar?</Text>
      </View>
      <View>
        <Button
          title="Administración"
          width={windowWidth * 0.6}
          color={'#EF4920'}
          onPress={() => handlerOptions('hogar')}
          height={windowWidth * 0.13}
        />
        <Button
          title="Técnico"
          width={windowWidth * 0.6}
          color={'#EF4920'}
          height={windowWidth * 0.13}
          onPress={() => handlerOptions('tecnico')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211FB5',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btnContainer: {},
  textWelcome: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: windowWidth * 0.05,
  },
});
