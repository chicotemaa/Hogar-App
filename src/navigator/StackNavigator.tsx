import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

/* Screens */
import {HomeScreen} from '../screens/HomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
//Para cliente
import {CrearSolicitudScreen} from '../screens/CrearSolicitudScreen';

import {HistorialSolicitudesScreen} from '../screens/HistorialSolicitudesScreen';
import {Drawer} from 'react-native-paper';
import {DetallesSolicitudScreen} from '../screens/DetallesSolicitudScreen';

/* Params in pages */
export type RootStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  WelcomeScreen: {email: string; token: string};
  CrearSolicitudScreen: undefined;
  DetalleSolicitudScreen: {codigo: string; navigation: any};
  HistorialSolicitudesScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EC5342',
          shadowColor: 'transparent',
        },
        headerShown: true,
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false, title: 'Iniciar Sesión'}}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{title: '', headerBackTitle: ''}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="WelcomeScreen"
        options={{title: '', headerBackTitle: ''}}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="CrearSolicitudScreen"
        component={CrearSolicitudScreen}
      />
      <Stack.Screen
        name="HistorialSolicitudesScreen"
        component={HistorialSolicitudesScreen}
        options={{headerShown: true, title: ''}}
      />
      <Stack.Screen
        name="DetalleSolicitudScreen"
        component={DetallesSolicitudScreen}
        options={{headerShown: true, title: 'Atras'}}
      />
    </Stack.Navigator>
  );
};
