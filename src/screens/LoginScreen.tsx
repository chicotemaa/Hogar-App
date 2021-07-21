import { DrawerScreenProps } from '@react-navigation/drawer';

import * as React from 'react';

import { StyleSheet, View, ScrollView } from 'react-native';

import { FormLogin } from '../components/FormLogin';
import { Logo } from '../components/Logo';
import { useNavigation } from '@react-navigation/native';

interface Props extends DrawerScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {
  const stackNavigator = useNavigation();

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
            stackNavigator.navigate('WelcomeScreen');
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
    padding: 10,
  },
});
