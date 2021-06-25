import 'react-native-gesture-handler';
import React from 'react';
import {Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {  
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {MenuLeft} from './src/navigator/MenuLeft';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F76656',
    accent: '#f1c40f',
  },
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {/* <StackNavigator /> */}
          {/* <Menu /> */}
          <MenuLeft />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
