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
  SuccessScreen: {success: boolean};
  ListadoOTScreen: undefined;
  DetalleOTScreen: undefined;
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
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{gestureEnabled: false}}
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
      />
      <Stack.Screen
        name="DetalleSolicitudScreen"
        component={DetallesSolicitudScreen}
      />
      <Stack.Screen
        name="FormSolicitudScreen"
        component={FormSolicitudScreen}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="ListadoOTScreen" component={ListadoOTScreen} />
      <Stack.Screen name="DetalleOTScreen" component={DetalleOTScreen} />
    </Stack.Navigator>
  );
};
