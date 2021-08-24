import { ImagePickerResponse } from 'react-native-image-picker';
import { uploadImage } from '~/api/api';

export async function uploadPhoto(cameraResponse: ImagePickerResponse) {
  const fileToUpload = cameraResponse.assets[0];
  const fileData = await uploadImage(fileToUpload);
  //Upload image
  return fileData;
}
