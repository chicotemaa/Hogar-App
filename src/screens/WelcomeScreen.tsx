import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title} from '../components/Title';
import {Button} from '../components/Button';
import {styles} from '../theme/appTheme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {Header} from '../components/Header';

interface Props extends StackScreenProps<RootStackParams, 'WelcomeScreen'> {}

export const WelcomeScreen = ({navigation, route}: Props) => {
  const {email, token} = route.params;

  const handleSolicitud = async () => {
    //const solicitudes = await getSolicitudesAPI(token);
    console.log(token);
    navigation.navigate('CrearSolicitudScreen', {navigation});
  };

  return (
    <>
      <Header pageName="Bienvenido" userName={email} />
      <View
        style={[
          styles.container,
          {
            flex: 3,
            borderTopWidth: 10,
            borderTopColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View style={{marginBottom: 15}}>
          <Button
            title={'Solicitar'}
            color="#178C54"
            height={70}
            width={270}
            onPress={handleSolicitud}
          />
          <View style={stylesWelcome.aclaraciónContainer}>
            <Title
              color="#343030"
              text={`Crear una nueva solicitud`}
              size={14}
            />
          </View>

          <Button
            title={'Ver mis solicitudes'}
            color="#253D5B"
            height={70}
            width={270}
            onPress={() => navigation.navigate('HistorialSolicitudesScreen')}
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
    </>
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
