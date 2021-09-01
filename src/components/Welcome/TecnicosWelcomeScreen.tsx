import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TecnicosOTList } from '../OT/Tecnicos/TecnicosOTList';
import { ExpressList } from '../OT/Tecnicos/ExpressList';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

export const TecnicosWelcomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Pendientes') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Realizadas') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
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
