import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { DrawerScreenProps, DrawerContent } from '@react-navigation/drawer';
import {Title} from '../components/Title';
import {Button as ButtonC} from '../components/Button';
import {styles} from '../theme/appTheme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {Header} from '../components/Header';
import {getToken, getUserInfo} from '../api/api';
import { ToggleHeader } from '../components/ToggleHeader';


//interface Props extends StackScreenProps<RootStackParams, 'WelcomeScreen'> {}
interface Props extends DrawerScreenProps<any,any>{};

export const WelcomeScreen = ({navigation}: Props) => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    getToken().then(token => {
      getUserInfo(token).then(response => {
        setUserName(capitalizeFirstLetter(response.data.username));
      });
    });
    
    

    navigation.setOptions({
      headerShown:true,
      gestureEnabled:true,
      headerRight: ()=> (<Button title='menu' onPress={()=>{
        navigation.toggleDrawer()
      }}/>)
    })
  }, []);

  const handleSolicitud = async () => {
    navigation.navigate('FormSolicitudScreen');
  };

  return (
    <>
      <Header pageName="Bienvenido" userName={userName} />
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
          <ButtonC
            title={'Solicitar asistencia'}
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

          <ButtonC
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
          <ButtonC
            title={'Ver ordenes de trabajo'}
            color="#2F9C63"
            height={70}
            width={270}
            onPress={() => navigation.navigate('ListadoOTScreen')}
          />
        </View>
      </View>
    </>
  );
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
