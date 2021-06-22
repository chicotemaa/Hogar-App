import React from 'react';

import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import {SettingsScreen} from '../screens/SettingsScreen';
import {StackNavigator} from './StackNavigator';
import {HomeScreen} from '../screens/HomeScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';

const Drawer = createDrawerNavigator();

export const Menu = () => {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="home" options={{title:'Inicio'}} component={HomeScreen} />
      <Drawer.Screen        
        name="Stack"
        component={StackNavigator}
        options={{headerShown: false,title:'Iniciar Sesión'}}
      />
    </Drawer.Navigator>
  );
};
