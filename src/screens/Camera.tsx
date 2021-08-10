import React from 'react';
import {StyleSheet, View} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {Button} from '../components/Button';

export const Camera = () => {
  const [{cameraRef}, {takePicture}] = useCamera();

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'Necesitamos permisos para usar la camara ',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        // onGoogleVisionBarcodesDetected={({ barcodes }) => {
        //     console.log(barcodes);
        // }}
        style={styles.preview}>
        <Button
          color="red"
          title="Sacar foto"
          onPress={() => {
            captureHandle();
          }}
        />
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
