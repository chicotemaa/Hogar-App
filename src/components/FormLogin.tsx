import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {InputStandard} from 'react-native-input-outline';

export const FormLogin = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  return (
    <View>
      <InputStandard />
      <Input
        label={'Email'}
        placeholder="email@correo.com"
        containerStyle={{backgroundColor: 'white'}}
      />
      <Input label={'Contraseña'} placeholder="Contraseña" />
      <Button title="Iniciar Sesión" onPress={() => console.log('hola')} />
    </View>
  );
};
