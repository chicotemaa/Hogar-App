import React, { useEffect, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { Header } from '../components/Header';
import { getToken, getUserInfo } from '../api/api';
import { TecnicosWelcomeScreen } from '../components/Welcome/TecnicosWelcomeScreen';
import { WelcomeOptions } from '../components/Welcome/WelcomeOptions';

interface Props extends DrawerScreenProps<any, any> { }

export const WelcomeScreen = ({ navigation }: Props) => {
  const [userName, setUserName] = useState('');
  const [roleUser, setRoleUser] = useState('');

  useEffect(() => {
    getToken().then(token => {
      getUserInfo(token).then(response => {
        const { username, roles } = response.data;
        setUserName(capitalizeFirstLetter(username));

        if (roles[1] === 'ROLE_EMPLEADO') {
          setRoleUser('tecnico')
        } else {
          setRoleUser('user')
        }
      });
    });

    navigation.setOptions({
      gestureEnabled: false,
    });
  }, []);



  return (
    <>
      <Header pageName="Bienvenido" userName={userName} roleUser={roleUser} />
      {roleUser === 'tecnico' ? (
        <TecnicosWelcomeScreen navigation={navigation} />) :
        (<WelcomeOptions navigation={navigation} />)
      }
    </>
  );
};



function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


