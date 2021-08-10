import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { login } from '../api/api';
import { TextInput, Button, Snackbar } from 'react-native-paper';

interface Props {
  pageToGo: Function;
}

interface User {
  email: string;
  password: string;
}

export const FormLogin = ({ pageToGo }: Props) => {
  const [state, setState] = useState<User>({
    email: '',
    password: '',
  });

  const [hidePass, setHidePass] = useState(true);
  const [correctLogin, setCorrectLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);

  const onToggleSnackBar = () => setVisibleAlert(!visibleAlert);
  const onDismissSnackBar = () => setVisibleAlert(false);

  const checkAuth = (state: User) => {
    const { email, password } = state;

    setIsLoading(true);

    login(email, password)
      .then(() => {
        setIsLoading(false);
        setCorrectLogin(true);
        pageToGo();
      })
      .catch(error => {
        onToggleSnackBar();
        setIsLoading(false);
        setCorrectLogin(false);
        console.log(error);
      });
  };

  return (
    <View>
      <Snackbar
        visible={visibleAlert}
        onDismiss={onDismissSnackBar}
        duration={2000}
        style={{ position: 'absolute', top: -280 }}>
        {correctLogin ? 'sesion iniciada' : 'Datos de cuenta no validos'}
      </Snackbar>
      <View style={{ marginBottom: 15 }}>
        <TextInput
          mode={'outlined'}
          outlineColor="#8B8B8B"
          value={state.email}
          error={correctLogin ? false : true}
          onChangeText={value => setState({ ...state, email: value })}
          label="Usuario"
          style={styles.input}
          theme={{ roundness: 10 }}
          underlineColorAndroid="blue"
        />
        <TextInput
          mode={'outlined'}
          outlineColor="#8B8B8B"
          value={state.password}
          onChangeText={value => setState({ ...state, password: value })}
          theme={{ roundness: 10 }}
          style={styles.input}
          error={correctLogin ? false : true}
          label="Contraseña"
          secureTextEntry={hidePass ? true : false}
          right={
            <TextInput.Icon
              onPress={() => setHidePass(!hidePass)}
              name={hidePass ? 'eye' : 'eye-off'}
            />
          }
        />
      </View>
      <Button
        mode="contained"
        loading={isLoading ? true : false}
        color="#ef4920"
        style={styles.button}
        onPress={() => checkAuth(state)}
        theme={{ colors: { background: 'transparent' } }}>
        {isLoading ? 'Iniciando Sesión' : 'Iniciar Sesión'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    width: 360,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: 200,
    borderRadius: 10,
    marginTop: '5%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
