import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { launchCamera } from 'react-native-image-picker';

export const Foto = () => {
  const [tempUri, setTempUri] = useState<string>();

  const handlePress = () => {
    launchCamera(
      {
        includeBase64: true,
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 0.1,
      },
      resp => {
        setTempUri(resp.assets[0].uri || '');
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fotoTomada}>
        {tempUri && (
          <Image style={styles.fotoTomada} source={{ uri: tempUri }} />
        )}
      </View>
      <View style={styles.boton}>
        <Button icon="camera" mode="contained" onPress={handlePress}>
          Tomar Foto
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
  },
  fotoTomada: {
    flex: 1,
    height: 200,
  },
  boton: {
    flex: 1,
  },
});
