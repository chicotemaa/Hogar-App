import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { launchCamera } from 'react-native-image-picker';
import { ModuloContext } from '~/context/modulo/ModuloContext';
import { b64toBlob, convertFile } from '~/services/cameraService';
import { PropiedadItem } from '~/api/types';

interface Props {
  propiedadItem: PropiedadItem;
}

export const Foto = ({ propiedadItem }: Props) => {
  const [tempUri, setTempUri] = useState<string>();
  const { getResultado, setResultado } = useContext(ModuloContext);

  const value = getResultado(propiedadItem.id)?.valor ?? [''];

  const handlePress = () => {
    launchCamera(
      {
        includeBase64: true,
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 0.1,
      },
      resp => {
        if (resp.didCancel) {
          return null;
        }
        if (resp.errorCode) {
          return null;
        }

        setTempUri(resp.assets[0].uri || '');

        // setResultado(propiedadItem, {
        //   valor: [''],
        //   imageSize: 4411,
        //   imageName: resp.assets[0].uri,
        // });

        convertFile(resp)

      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fotoTomada}>
        {tempUri && (
          <Image
            style={styles.fotoTomada}
            resizeMode={'cover'}
            source={{ uri: tempUri ?? value[0] }}
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
