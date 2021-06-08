import {StackScreenProps} from '@react-navigation/stack';
import * as React from 'react';

import {StyleSheet, View, ScrollView} from 'react-native';

import {FormLogin} from '../components/FormLogin';
import {Logo} from '../components/Logo';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  navigation.setOptions({});
  return (
    <ScrollView centerContent={true} contentContainerStyle={styles.body}>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Logo />
      </View>
      <View style={styles.form}>
        <FormLogin navigation={navigation} />
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
