import React, { useEffect, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { Header } from '~/components/Header';
import { getUserInfo } from '~/api/api';
import { TecnicosWelcomeScreen } from '~/components/Welcome/TecnicosWelcomeScreen';
import { WelcomeOptions } from '~/components/Welcome/WelcomeOptions';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getNombreCliente } from '~/api/apiClientes';
import { adminROLES, userRol } from '~/api/types';
import { useQuery } from 'react-query';
import { OptionsAdmin } from './administrador/OptionsAdmin';
import { HogarOptions } from './administrador/HogarOptions';

interface Props extends DrawerScreenProps<any, any> {}

export const WelcomeScreen = ({ navigation }: Props) => {
  const [userName, setUserName] = useState('');
  const [clienteName, setClienteName] = useState<string>('');
  const [roleUser, setRoleUser] = useState<userRol>();
  const { data, isFetching } = useQuery('userData', getUserInfo);

  navigation.setOptions({
    gestureEnabled: false,
  });

  const elegirRol = (rol: userRol) => {
    setRoleUser(rol);
  };

  useEffect(() => {
    if (data) {
      const { username, roles, cliente } = data.data;
      setUserName(username);
      setRoleUser(getRoleUser(roles));
      // TODO verificar que pasa si user no tiene cliente
      try {
        getNombreCliente(cliente.id).then(nombreCliente => {
          setClienteName(nombreCliente);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [data, setRoleUser]);

  if (isFetching) {
    return (
      <View>
        <Spinner
          visible={isFetching}
          textContent={'Cargando...'}
          textStyle={{ color: '#FFF' }}
        />
      </View>
    );
  }

  if (roleUser === 'administrador') {
    return <OptionsAdmin handlerOptions={elegirRol} />;
  }

  return (
    <ScreenContainer
      roleUser={roleUser}
      userName={userName}
      clienteName={clienteName}
    />
  );
};

const ScreenContainer = ({
  roleUser,
  userName,
  clienteName,
}: {
  roleUser: userRol;
  userName: string;
  clienteName?: string;
}) => {
  return (
    <>
      <Header
        pageName="Bienvenido"
        userName={userName}
        clienteName={clienteName}
        roleUser={roleUser}
      />
      {roleUser === 'tecnico' ? (
        <TecnicosWelcomeScreen />
      ) : roleUser === 'hogar' ? (
        <HogarOptions />
      ) : (
        <WelcomeOptions />
      )}
    </>
  );
};

function getRoleUser(rolesUser: string[]) {
  const isTecnico = rolesUser.some((rol: string) => rol === 'ROLE_EMPLEADO');
  const isAdministrador = rolesUser.some(v => adminROLES.indexOf(v) >= 0);
  return isAdministrador ? 'administrador' : isTecnico ? 'tecnico' : 'cliente';
}
