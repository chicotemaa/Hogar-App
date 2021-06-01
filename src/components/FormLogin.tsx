import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from './Button';
import { functionToGetToken } from '../api/api';
import { TextInput } from 'react-native-paper';


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

  const [hidePass, setHidePass] = useState(true);

  const checkAuth = (state: User) => {
    const {email, password} = state;
    functionToGetToken(email,password)
    .then((response) => {
      console.log('correcto')
      navigation.navigate('WelcomeScreen', {email, password, response})})
    .catch((error) => {
      console.log('datos incorrectos')
      
  })
    
  };

  return (
    <View>
      <View style={{marginBottom: 15}}>
        <TextInput
          mode={'outlined'}
          outlineColor="#8B8B8B"
          value={state.email}
          onChangeText={value => setState({...state, email: value})}
          label="Email"
          style={styles.input}
          theme={{roundness: 10}}
        />
        <TextInput
          mode={'outlined'}
          outlineColor="#8B8B8B"
          value={state.password}
          onChangeText={value => setState({...state, password: value})}
          theme={{roundness: 10}}
          style={styles.input}
          label="Contraseña"
          secureTextEntry={hidePass ? true : false}
          right={
            <TextInput.Icon onPress={() => setHidePass(!hidePass)} name="eye" />
          }
        />
      </View>
      <Button
        title="Iniciar Sesión"
        color="#EC5342"
        onPress={() => checkAuth(state)}
      />
    </View>
  );
};

const styles = StyleSheet.create({  
  input: {    
    alignSelf: 'center',
    width:360,
    marginBottom:10,     
  },  
});

