import { launchCamera, ImagePickerResponse } from 'react-native-image-picker';

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
