import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {TouchableHighlight} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<any, any> {}

export const HomeScreen = () => {
  return (
    <View>
      <Text>Hola mundo</Text>
    </View>
  );
};
