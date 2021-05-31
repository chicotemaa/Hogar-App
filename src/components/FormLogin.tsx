import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from './Button';
import { functionToGetToken } from '../api/api';

interface Props extends StackScreenProps<any, any> {}

interface User {
  email: string;
  password: string;  
}

export const FormLogin = ({navigation}: Props) => {
  const [state, setState] = useState<User>({
    email: '',
    password: '',
  });

  const checkAuth = (state: User) => {
    const {email, password} = state;
    functionToGetToken(email,password)
    .then((response) => {
      console.log('correcto')
      navigation.navigate('WelcomeScreen', {email, password, response})})
    .catch((error) => {console.log('datos incorrectos')})
    
  };

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
        onPress={() => checkAuth(state)}
      />
    </View>
  );
};
