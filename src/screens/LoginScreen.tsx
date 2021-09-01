import * as React from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';

import { FormLogin } from '~/components/FormLogin';
import { Logo } from '~/components/Logo';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { windowWidth } from '~/dimensions';
import { RootStackParams } from '~/navigator/StackNavigator';

export const LoginScreen = () => {
  const stackNavigator = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <ScrollView centerContent={true} contentContainerStyle={styles.body}>
      <View
        style={{
          alignSelf: 'center',
          marginBottom: '17%',
        }}>
        <Logo />
      </View>
      <View style={styles.form}>
        <FormLogin
          pageToGo={() => {
            // TODO verificar que mandar en email y token
            stackNavigator.navigate('WelcomeScreen', { email: '', token: '' });
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#E7E1E1',
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: 0.01 * windowWidth,
  },
});
