import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export class Foto extends PureComponent {
  render() {
    return (
      <View>
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log('camara');
            }}>
            <Text style={{ fontSize: 14 }}> Sacar foto </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
