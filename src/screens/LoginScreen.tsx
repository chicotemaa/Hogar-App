import * as React from 'react';

import {StyleSheet, View, ScrollView} from 'react-native';

import {FormLogin} from '../components/FormLogin';
import {Logo} from '../components/Logo';

export const LoginScreen = () => {
  return (
    <ScrollView centerContent={true} contentContainerStyle={styles.body}>
      <View
        style={{
          alignSelf: 'center',
          borderWidth: 5,
          borderColor: 'red',
          margin: 10,
        }}>
        <Logo />
      </View>
      <View style={styles.form}>
        <FormLogin />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#E7E1E1',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  form: {
    padding: 10,
  },
});
