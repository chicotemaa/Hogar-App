import 'react-native-gesture-handler';
import React from 'react';
import { Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { MenuLeft } from './src/navigator/MenuLeft';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient , QueryClientProvider} from 'react-query';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ef4920',
    accent: '#f1c40f',
  },
};

const queryClient = new QueryClient() 

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MenuLeft />
        </NavigationContainer>
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
