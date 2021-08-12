import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { MenuLeft } from './src/navigator/MenuLeft';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ef4920',
    accent: '#f1c40f',
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, //cantidad de intentos en error
      refetchOnWindowFocus: false,
    },
  },
});

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
