import React, { useEffect, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { Header } from '~/components/Header';
import { getUserInfo } from '~/api/api';
import { TecnicosWelcomeScreen } from '~/components/Welcome/TecnicosWelcomeScreen';
import { WelcomeOptions } from '~/components/Welcome/WelcomeOptions';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getNombreCliente } from '~/api/apiClientes';
import { adminROLES } from '~/api/types';

interface Props extends DrawerScreenProps<any, any> {}

export const WelcomeScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [clienteName, setClienteName] = useState<string>('');
  const [roleUser, setRoleUser] = useState('');

  useEffect(() => {
    getUserInfo().then(response => {
      setUserName(capitalizeFirstLetter(response.data.username));

      if (getRoleUser(response.data.roles)) {
        setRoleUser('user');
      }
      if (getRoleUser(response.data.roles)) {
        setRoleUser('tecnico');
      } else {
        // TODO verificar que pasa si user no tiene cliente
        try {
          getNombreCliente(response.data.cliente.id).then(nombreCliente => {
            setClienteName(nombreCliente);
          });
          setRoleUser('user');
        } catch (err) {
          console.log(err);
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <>
      {loading ? (
        <View>
          <Spinner
            visible={loading}
            textContent={'Cargando...'}
            textStyle={{ color: '#FFF' }}
          />
        </View>
      ) : (
        <>
          <Header
            pageName="Bienvenido"
            userName={userName}
            clienteName={clienteName}
            roleUser={roleUser}
          />
          {roleUser === 'tecnico' ? (
            <TecnicosWelcomeScreen />
          ) : (
            <>
              <WelcomeOptions navigation={navigation} />
            </>
          )}
        </>
      )}
    </>
  );
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRoleUser(rolesUser: string[]) {
  const isTecnico = rolesUser.some((rol: string) => rol === 'ROLE_EMPLEADO');
  const isAdministrador = rolesUser.some(v => adminROLES.indexOf(v) >= 0);
  return isAdministrador ? 'tecnico' : isTecnico ? 'tecnico' : 'cliente';
}
