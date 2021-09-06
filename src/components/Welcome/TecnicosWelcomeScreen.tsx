import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TecnicosOTList } from '../OT/Tecnicos/TecnicosOTList';
import { ExpressList } from '../OT/Tecnicos/ExpressList';

const Tab = createMaterialTopTabNavigator();

export const TecnicosWelcomeScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: { fontSize: 15 },
        pressColor: '#ef4920',
        indicatorStyle: {
          backgroundColor: '#ef4920',
        },
      }}>
      <Tab.Screen name="Pendientes" component={PendientesList} />
      <Tab.Screen name="Realizadas" component={RealizadasList} />
      <Tab.Screen name="Express" component={ExpressList} />
    </Tab.Navigator>
  );
};

const PendientesList = () => {
  return <TecnicosOTList isPendientes />;
};

const RealizadasList = () => {
  return <TecnicosOTList isPendientes={false} />;
};
