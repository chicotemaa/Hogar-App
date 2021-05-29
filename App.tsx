import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';

const App = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
