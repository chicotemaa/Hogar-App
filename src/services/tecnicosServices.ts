import {
  changeStateOrdenTrabajo as changeStateOTAPI,
  getOtByEstadoAPI,
  getOtById,
} from '../api/apiTecnicos';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';
import {
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import { getSucursalCliente } from '../api/apiClientes';
import { OrdenTrabajo } from './interfaces';

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

export const getSucursalStreet = async (sucursalId: string) => {
  const sucursal = await getSucursalCliente(sucursalId);
  return sucursal.direccion;
};

export const getOrdenesTrabajoInfo = async (): Promise<OrdenTrabajo[]> => {
  const ordenesTrabajo: OrdenTrabajo[] = await getOtByEstadoAPI();
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

export const changeStateEnCamino = (OrdenTrabajo: any) => {
  const data = {
    estado: 1,
  };
  changeStateOTAPI(OrdenTrabajo, data);
};

export const changeStateMeRecibio = async (OrdenTrabajo: any) => {
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
        changeStateOTAPI(OrdenTrabajo, data);
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

export const changeStateNoMeRecibio = (OrdenTrabajo: any) => {
  changeStateOTAPI(OrdenTrabajo, { estado: 3 });
  //TODO: tomar ubicacion donde marco que no me recibió
};

export const changeStateFinalizado = async (OrdenTrabajo: any) => {
  if (await checkLocationPermission()) {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getOtById(OrdenTrabajo.id).then(({ horaInicio }) => {
          const diffMinutes = getDiffMinutes(horaInicio);
          const data = {
            estado: 4,
            latitudCierre: latitude.toString(),
            longitudCierre: longitude.toString(),
            horaFin: getISODate(),
          };
          //crear formulario resultado con los minutos trabajados

          changeStateOTAPI(OrdenTrabajo, data);
        });
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
    return false;
  }
};

export const changeStatePostergado = (OrdenTrabajo: any) => {
  changeStateOTAPI(OrdenTrabajo, 5);
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
