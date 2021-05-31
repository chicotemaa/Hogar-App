import React, {useEffect} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import {Title} from '../components/Title';
import {Button} from '../components/Button';
import {styles} from '../theme/appTheme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {functionToGetToken, getProfile} from '../api/api';

interface Props extends StackScreenProps<RootStackParams, 'WelcomeScreen'> {}

export const WelcomeScreen = ({navigation, route}: Props) => {
  const {email} = route.params;

  const getToken = async () => {
    const response = await functionToGetToken();
    //console.log('hola');
    //console.log(response);
    const {access_token} = response.data;
    const resp = await getProfile(access_token);
    console.log(resp);
  };

  return (
    <View style={styles.container}>
      <View style={stylesWelcome.menuContainer}>
        <View style={stylesWelcome.menu} />
      </View>
      <View style={stylesWelcome.header}>
        <Title color="#343030" text={`Bienvenido ${email}`} size={63} />
        <Title color="#ED2914" text={`Santander Rio`} size={23} />
        <Title color="#EA4D3B" text={`Sucursal Resistencia`} size={23} />
      </View>
      <View style={{marginTop: 5, marginBottom: 15, flex: 2}}>
        <Button
          title={'Solicitar'}
          color="#178C54"
          height={70}
          width={270}
          onPress={() => console.log('solicitar')}
        />
        <View style={stylesWelcome.aclaraciónContainer}>
          <Title color="#343030" text={`Crear una nueva solicitud`} size={14} />
        </View>

        <Button
          title={'Ver mis solicitudes'}
          color="#253D5B"
          height={70}
          width={270}
          onPress={() => getToken()}
        />
        <View style={stylesWelcome.aclaraciónContainer}>
          <Title
            color="#343030"
            text={`Ver un historial de solicitudes previas`}
            size={14}
          />
        </View>
      </View>
    </View>
  );
};

const stylesWelcome = StyleSheet.create({
  menuContainer: {
    margin: 5,
  },
  menu: {
    height: 30,
    backgroundColor: '#473E3E',
    alignSelf: 'flex-end',
    margin: 10,
    borderColor: 'blue',
    borderWidth: 2,
  },
  header: {
    flex: 2,
    margin: 10,
    padding: 3,
    alignItems: 'center',
  },
  aclaraciónContainer: {
    margin: 10,
  },
});
