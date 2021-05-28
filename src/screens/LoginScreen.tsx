import * as React from 'react';
import {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Button} from 'react-native-elements';

import logo from '../assets/images/util/logo.png';

export const LoginScreen = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  return (
    <View style={styles.body}>
      <Image source={logo} style={styles.logoImg} />

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          onChangeText={value => setState({...state, email: value})}
          style={styles.InputEmail}
        />
        <TextInput
          placeholder="Password"
          onChangeText={value => setState({...state, password: value})}
          style={styles.InputEmail}
        />
        <Button style={styles.button} title="Iniciar Sesión" />
        {/* <Button title="Loading button" loading /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log(state)}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  form: {
    flex: 3,
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  button: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#EC5342',
    width: 150,
    borderRadius: 8,
    opacity: 1,
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  InputEmail: {
    borderRadius: 5,
    height: 50,
    borderWidth: 2,
    borderColor: 'skyblue',
    margin: 20,
    padding: 15,
  },
  logoImg: {
    margin: 'auto',
    flex: 1,
    width: '30%',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
});
