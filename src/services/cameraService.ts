import { Asset, CameraOptions } from 'react-native-image-picker';
import { uploadImage } from '~/api/api';

import { launchCamera as nativeLaunchCamera } from 'react-native-image-picker';

export async function uploadPhoto(asset: Asset) {
  const fileData = await uploadImage({
    uri: asset.uri!,
    type: asset.type!,
    fileName: asset.fileName!,
  });
  //Upload image
  return fileData;
}

export function launchCamera(options: CameraOptions): Promise<Asset[] | null> {
  return new Promise((resolve, reject) => {
    nativeLaunchCamera(options, resp => {
      if (resp.errorCode) {
        const error = new Error(resp.errorMessage);
        reject(error);
      } else if (resp.didCancel) {
        resolve(null);
      } else {
        resolve(resp.assets ?? null);
      }
    });
  });
}
