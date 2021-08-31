/* eslint-disable no-shadow */
import {
  changeStateOrdenTrabajo as changeStateOTAPI,
  getFormularioResultadoById,
  getOtByEstadoAPI,
  getOtById,
  getFormulariosExpressList,
  sendFormularioExpressResultado,
  modifyFormularioExpressResultado,
} from '../api/apiTecnicos';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';
import {
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import { getSucursalCliente } from '../api/apiClientes';
import {
  OrdenTrabajo,
  MediaObject,
  Formulario,
  FormularioResultadoExpress,
} from '../api/types';
import { getStorageResultados } from '~/storage';
import { postResultado } from '~/api/apiTecnicos';
import { AxiosResponse } from 'axios';
import { api, uploadImage } from '~/api/api';
import * as FileSystem from 'react-native-fs';

// 'Pendiente': 0
// 'Estoy en camino': 1
// 'Me recibió': 2
// 'No me atendió': 3
// 'Finalizado': 4
// 'Postergado': 5
const getISODate = () => {
  const date = new Date();
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  ).toISOString();
};

const getCurrentPosition = (
  options?: Geolocation.GeoOptions,
): Promise<Geolocation.GeoPosition> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const convertb64ToFile = (b64string: string) => {
  console.log(b64string);

  const imgDatab64 = b64string.replace('data:image/png;base64,', '');
  const binary = new Blob([imgDatab64], { type: 'image/png' });
  console.log(binary);
};

export const getSucursalStreet = async (sucursalId: string) => {
  const sucursal = await getSucursalCliente(sucursalId);
  return sucursal.direccion;
};

export const getExpressList = async (): Promise<Formulario[]> => {
  const response = await getFormulariosExpressList();
  return response.data['hydra:member'];
};

export const postResultadoExpress = async ({
  formulario,
  isCompra,
  idFormCompra,
}: {
  formulario?: FormularioResultadoExpress;
  isCompra?: boolean;
  idFormCompra?: string;
}) => {
  let formularioToSend: FormularioResultadoExpress = {
    resultados: [],
    latitud: '1',
    longitud: '1',
    estado: 2,
    horaInicio: getISODate(),
    fecha: getISODate(),
    minutosTrabajado: 0,
  };

  if (isCompra) {
    formularioToSend = {
      ...formularioToSend,
      formulario: idFormCompra,
      compraMateriales: true,
    };
  } else {
    formularioToSend = {
      ...formularioToSend,
      formulario: formulario['@id'],
    };
  }

  return await sendFormularioExpressResultado(formularioToSend);
};

export const putResultadoExpress = async (
  ordenTrabajo: OrdenTrabajo,
  firma: string,
  aclaracion: string,
) => {
  if (await checkLocationPermission()) {
    const position = await getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 14000,
      maximumAge: 100,
    });
    const { latitude, longitude } = position.coords;
    const diffMinutes = getDiffMinutes(ordenTrabajo.horaInicio);
    const resultados = await getStorageResultados(ordenTrabajo.id);

    console.log('resultados', resultados);

    await saveSignFile(firma);
    const signName = await uploadSign();

    const expressResultado = {
      ...ordenTrabajo,
      formulario: ordenTrabajo.formulario['@id'],
      responsableFirma: aclaracion,
      imageName: signName,
      imageSize: 4411,
      latitud: String(latitude),
      longitud: String(longitude),
      minutosTrabajado: diffMinutes,
      horaFin: getISODate(),
      resultados,
      estado: 4,
    };
    modifyFormularioExpressResultado(expressResultado);
    return true;
  }
  return false;
};

export const getOrdenesTrabajoInfo = async (
  isPendientes: boolean,
): Promise<OrdenTrabajo[]> => {
  const ordenesTrabajo: OrdenTrabajo[] = await getOtByEstadoAPI(isPendientes);
  return await Promise.all(
    ordenesTrabajo.map(async (ordenTrabajo: OrdenTrabajo) => {
      return {
        ...ordenTrabajo,
        direccionSucursalCliente: await getSucursalStreet(
          ordenTrabajo.SucursalDeCliente,
        ),
      };
    }),
  );
};

export const changeStateEnCamino = (ordenTrabajo: OrdenTrabajo) => {
  const data = {
    estado: 1,
  };
  changeStateOTAPI(ordenTrabajo, data);
};

export const changeStateMeRecibio = async (ordenTrabajo: OrdenTrabajo) => {
  //TODO: controlar ubicacion antes de cambiar estado
  if (await checkLocationPermission()) {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const data = {
          estado: 2,
          latitud: latitude.toString(),
          longitud: longitude.toString(),
          horaInicio: getISODate(),
        };
        changeStateOTAPI(ordenTrabajo, data);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 14000,
        maximumAge: 100,
      },
    );
    return true;
  } else {
    console.log('Permiso de ubicación denegado');
    return false;
  }
};

export const changeStateNoMeRecibio = async (ordenTrabajo: OrdenTrabajo) => {
  if (await checkLocationPermission()) {
    const position = await getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 14000,
      maximumAge: 100,
    });
    const {
      coords: { latitude, longitude },
    } = position;
    const data = {
      estado: 3,
      latitud: String(latitude),
      longitud: String(longitude),
      horaFin: getISODate(),
    };

    changeStateOTAPI(ordenTrabajo, data);
  }
  //TODO: tomar ubicacion donde marco que no me recibió
};

export const changeStateFinalizado = async (
  ordenTrabajo: OrdenTrabajo,
  firma: string,
  aclaracion: string,
) => {
  if (await checkLocationPermission()) {
    const position = await getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 14000,
      maximumAge: 100,
    });
    const { latitude, longitude } = position.coords;
    const { horaInicio } = await getOtById(ordenTrabajo.id);
    const diffMinutes = getDiffMinutes(horaInicio);
    const resultados = await getStorageResultados(ordenTrabajo.id);

    await postResultado({
      resultados,
      ordenTrabajo: `/api/orden_trabajos/${ordenTrabajo.id}`,
      latitud: '1',
      longitud: '1',
      minutosTrabajado: diffMinutes,
      minutosReales: diffMinutes,
    });
    await saveSignFile(firma);
    const signName = await uploadSign();

    const data = {
      estado: 4,
      latitudCierre: String(latitude),
      longitudCierre: String(longitude),
      horaFin: getISODate(),
      imageName: signName,
      imageSize: 4411,
      responsableFirma: aclaracion,
    };
    changeStateOTAPI(ordenTrabajo, data);

    return true;
  } else {
    return false;
  }
};

export const changeStatePostergado = (ordenTrabajo: OrdenTrabajo) => {
  changeStateOTAPI(ordenTrabajo, { estado: 5 });
};

const checkLocationPermission = async () => {
  let permissionStatus: PermissionStatus;
  if (Platform.OS === 'ios') {
    permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else {
    permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
  return permissionStatus === 'granted';
};

const getDiffMinutes = (startTime: string) => {
  const start = new Date(startTime);
  const currentTime = new Date();

  const diffMins = currentTime.getTime() - start.getTime();

  return Math.floor(diffMins / 60000);
};

const saveSignFile = async (b64String: string) => {
  const path = FileSystem.CachesDirectoryPath + '/sign.png';
  FileSystem.writeFile(
    path,
    b64String.replace('data:image/png;base64,', ''),
    'base64',
  ).catch(console.error);
};

const uploadSign = async () => {
  const arrayOfFiles = await FileSystem.readDir(FileSystem.CachesDirectoryPath);
  const signFile = arrayOfFiles.find(element => element.name === 'sign.png');
  const currentDate = Date.now().toString();
  const singUploaded = await uploadImage({
    uri: 'file:///' + signFile.path!,
    type: 'image/png',
    fileName: `firma-${currentDate}.png`,
  });
  return singUploaded.data.filePath;
};

export const FormularioRealizado = async (OT: number) => {
  const OrdenTrabajo: OrdenTrabajo = await getOtById(OT);

  const TipoFormulario = OrdenTrabajo.formulario;
  const FormularioResultado = await getFormularioResultadoById(
    OrdenTrabajo.formularioResultado,
  );
  return TipoFormulario;
};
