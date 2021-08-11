import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { Image } from 'react-native-elements/dist/image/Image';
import logo from '~/assets/images/util/hogarLogo.png';

export const Logo = () => {
  return (
    <Avatar
      containerStyle={{
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#8B8B8B',
      }}
      imageProps={styles.imagenLogo}
      source={logo}
      size={200}
    />
  );
};

const styles = StyleSheet.create({
  imagenLogo: {
    resizeMode: 'center',
  },
});
