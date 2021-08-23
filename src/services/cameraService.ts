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

export function b64toBlob(
  b64Data: string,
  contentType: string,
  sliceSize?: number,
) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
