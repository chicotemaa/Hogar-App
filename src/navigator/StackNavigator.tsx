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

/* Params in pages */
export type RootStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  WelcomeScreen: {email: string; password: string; response: any};
  CrearSolicitudScreen: undefined;
  DetalleSolicitudScreen: undefined;
  HistorialSolicitudesScreen: {access_token: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E7E1E1',
          elevation: 0,
          shadowColor: 'transparent',
        },
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
    </Stack.Navigator>
  );
};
