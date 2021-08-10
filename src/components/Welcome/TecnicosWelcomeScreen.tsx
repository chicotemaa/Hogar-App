import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TecnicosOTList} from '../OT/Tecnicos/TecnicosOTList';

const Tab = createMaterialTopTabNavigator();

export const TecnicosWelcomeScreen = ({navigation}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 15},
      }}>
      <Tab.Screen name="Pendientes" component={PendientesTab()} />
    </Tab.Navigator>
  );
};

const PendientesTab = () => {
  return TecnicosOTList;
};
