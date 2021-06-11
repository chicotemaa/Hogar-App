import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

/* Screens */
import {HomeScreen} from '../screens/HomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
//Para cliente
import {HistorialSolicitudesScreen} from '../screens/HistorialSolicitudesScreen';
import {DetallesSolicitudScreen} from '../screens/DetallesSolicitudScreen';
import {FormSolicitudScreen} from '../screens/FormSolicitudScreen';
import {SuccessScreen} from '../screens/SuccessScreen';
import {ListadoOTScreen} from '../screens/ListadoOTScreen';
import {DetalleOTScreen} from '../screens/DetalleOTScreen';

/* Params in pages */
export type RootStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  WelcomeScreen: {email: string; token: string};
  CrearSolicitudScreen: {navigation: any};
  DetalleSolicitudScreen: {codigo: string; navigation: any};
  HistorialSolicitudesScreen: undefined;
  FormSolicitudScreen: undefined;
  SuccessScreen: undefined;
  ListadoOTScreen: undefined;
  DetalleOTScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DetalleOTScreen"
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
        name="HistorialSolicitudesScreen"
        component={HistorialSolicitudesScreen}
        options={{headerShown: true, title: ''}}
      />
      <Stack.Screen
        name="DetalleSolicitudScreen"
        component={DetallesSolicitudScreen}
        options={{headerShown: true, title: ''}}
      />
      <Stack.Screen
        name="FormSolicitudScreen"
        component={FormSolicitudScreen}
        options={{headerShown: true, title: ''}}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListadoOTScreen"
        component={ListadoOTScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="DetalleOTScreen"
        component={DetalleOTScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
