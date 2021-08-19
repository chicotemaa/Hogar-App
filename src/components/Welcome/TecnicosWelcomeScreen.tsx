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
        pressColor:'#ef4920',
        indicatorStyle:{
          backgroundColor:'#ef4920'
        }

      }}>
      <Tab.Screen name="Pendientes" component={TecnicosOTList} />
      <Tab.Screen name="Realizadas" component={TecnicosOTListRealizadas} 
       />
    </Tab.Navigator>
  );
};

