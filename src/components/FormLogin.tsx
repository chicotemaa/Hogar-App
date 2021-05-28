import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from './Button';

export const FormLogin = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  return (
    <View style={{elevation: 9, margin: 10}}>
      <Input label={'Email'} placeholder="Email" />
      <Input label={'Contraseña'} placeholder="Contraseña" />
      <Button
        title="Iniciar Sesíon"
        onPress={() => console.log('iniciar sesión')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
