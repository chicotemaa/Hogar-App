import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { ModuloContext } from '~/context/modulo/ModuloContext';
import { uploadPhoto, launchCamera } from '~/services/cameraService';
import { PropiedadItem } from '~/api/types';
import { getImageUrl } from '~/api/api';

interface Props {
  propiedadItem: PropiedadItem;
}

export const Foto = ({ propiedadItem }: Props) => {
  const { getResultado, setResultado } = useContext(ModuloContext);

  const imagePath = getResultado(propiedadItem.id)?.imageName;

  const handlePress = async () => {
    try {
      const assets = await launchCamera({
        includeBase64: true,
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 0.5,
      });
      if (assets) {
        const response = await uploadPhoto(assets[0]);
        setResultado(propiedadItem, {
          valor: [''],
          imageSize: 4411,
          imageName: response.data.filePath,
        });
      }
    } catch {
      //noop
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fotoTomada}>
        {imagePath && (
          <Image
            style={styles.fotoTomada}
            resizeMode={'cover'}
            source={{
              uri: getImageUrl(imagePath),
            }}
          />
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
    height: 150,
  },
  boton: {
    flex: 1,
  },
});
