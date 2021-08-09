import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { HomeScreen } from '../screens/HomeScreen';
import { ItemsSideBar } from '../components/ItemsSideBar';

const Drawer = createDrawerNavigator();

export const MenuLeft = () => {
  return (
    <Drawer.Navigator
      drawerType={'front'}
      drawerPosition="right"
      screenOptions={{ headerShown: true }}
      drawerContent={props => <ItemsSideBar {...props} />}>
      <Drawer.Screen name="home" component={HomeScreen} />
      <Drawer.Screen
        name="Stack"
        component={StackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
