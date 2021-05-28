import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from './Button';

export const FormLogin = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  return (
    <View style={{elevation: 9, margin: 10}}>
      <Input
        label={'Email'}
        placeholder="Email"
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={value => setState({...state, email: value})}
      />
      <Input
        textContentType="password"
        secureTextEntry={true}
        label={'Contraseña'}
        placeholder="Contraseña"
        onChangeText={value => setState({...state, password: value})}
      />

      <Button
        title="Iniciar Sesión"
        color="#EC5342"
        onPress={() => console.log(state)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
