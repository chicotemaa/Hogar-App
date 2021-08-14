import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TecnicosOTList } from '../OT/Tecnicos/TecnicosOTList';
import { TecnicosOTListRealizadas } from '../OT/Tecnicos/TecnicosOTListRealizadas';

const Tab = createMaterialTopTabNavigator();

export const TecnicosWelcomeScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: { fontSize: 15 },
      }}>
      <Tab.Screen name="Pendientes" options={{}} component={TecnicosOTList} />
      <Tab.Screen name="Realizadas" component={TecnicosOTListRealizadas} />
    </Tab.Navigator>
  );
};

