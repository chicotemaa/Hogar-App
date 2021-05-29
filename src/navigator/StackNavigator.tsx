import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

/* Screens */
import {HomeScreen} from '../screens/HomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';

import React from 'react';
import {useColorScheme} from 'react-native';

export const StackNavigator = () => {
  const scheme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E7E1E1',
          elevation: 0,
          shadowColor: 'transparent',
        },
        // headerShown: false,
      }}>
      <Stack.Screen
        name="loginScreen"
        options={{title: ''}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="homeScreen"
        options={{title: ''}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="WelcomeScreen"
        options={{title: ''}}
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
};
