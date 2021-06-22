import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme, Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Menu} from './src/navigator/MenuLateral';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {StackNavigator} from './src/navigator/StackNavigator';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EC5342',
    accent: '#f1c40f',
  },
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

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
