import { launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import { uploadImage } from '~/api/api';
//const b64toBlob = require('b64-to-blob');

import { PermissionsAndroid } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

export const tookPicture = () => {
  console.log('sacar foto');
  launchCamera(
    {
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.5,
    },
    (resp: ImagePickerResponse) => {
      console.log(resp);
    },
  );
};

export function convertFile(file: ImagePickerResponse) {
  //const b64Data = file.assets[0].base64;
  //console.log('blob generated', binaryData);
  //const contentType = 'image/png';
  // uploadImage(b64toBlob(b64Data, contentType));
  //Upload image
}
