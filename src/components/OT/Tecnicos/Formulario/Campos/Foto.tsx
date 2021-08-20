import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tookPicture } from '~/services/cameraService';
import { Button } from 'react-native-paper';

export const Foto = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fotoTomada}>
        <Text>Imagen tomada</Text>
      </View>
      <View style={styles.boton}>
        <Button icon="camera" mode="contained" onPress={tookPicture}>
          Sacar Foto
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  fotoTomada: {
    flex: 1,
    borderWidth: 1,
  },
  boton: {
    flex: 1,
  },
});
