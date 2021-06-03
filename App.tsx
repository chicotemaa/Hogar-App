import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';

import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import {Menu} from './src/navigator/MenuLateral';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EC5342',
    accent: '#f1c40f',
  },
};

const App = () => {
  const scheme = useColorScheme();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* <StackNavigator /> */}
        <Menu />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
